/************************************************
* ble midi packer
* dallin williams - 11 apr 2019
*
* esp32 program to convert between ble input and midi output
* midi is written over serial
*/

#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <SPI.h>

#define RXD2 3
#define TXD2 1

const uint8_t NOTE_OFF = 0x80;
const uint8_t NOTE_ON = 0x90;
const int ON = 1;
const int OFF = 0;
const int VEL = 0b1011010; // 90
static int toggles[] = {0, 0, 0, 0};
static int prev[] = {0, 0, 0, 0};

const int LED = 2;

BLECharacteristic *pCharacteristic;
bool deviceConnected = false;

#define SERVICE_UUID           "6E400001-B5A3-F393-E0A9-E50E24DCCA9E" // UART service UUID
#define CHARACTERISTIC_UUID_RX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_TX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

void parseCandV(String rx)
{ 
  int pos = rx.indexOf(",");
  int c = rx.substring(0, pos).toInt();
  int v = rx.substring(pos+1).toInt();

  // channels 10-13 are sliders for volume
  if(c >= 10 && c <= 13)
  {
    v = (v/8)&0b1111111; // scale down to 0-127 (MIDI range)
    //if the voice is enabled
    if(toggles[c-10] == 1)
    {
      //turn off the old note and turn on the new one
      sendMIDI(NOTE_OFF, c, prev[c-10], VEL);
      sendMIDI(NOTE_ON, c, v, VEL);
      prev[c-10] = v;
    }
  }
  if(c >= 1 && c<=4)
  {
    toggles[c-1] ^= 1;
  }
}

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};

class MyCallbacks: public BLECharacteristicCallbacks 
{
    void onWrite(BLECharacteristic *pCharacteristic) 
    {
      std::string rxValue = pCharacteristic->getValue();
      if (rxValue.length() > 0)
      {
        digitalWrite(LED, HIGH);
        parseCandV(rxValue.c_str());
        digitalWrite(LED, LOW);
      }
    }
};

void setup() {
  digitalWrite(LED, LOW);
  Serial.begin(115200);
  BLEDevice::init("ESP32 MIDI");
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  BLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(CHARACTERISTIC_UUID_TX, BLECharacteristic::PROPERTY_NOTIFY);              
  pCharacteristic->addDescriptor(new BLE2902());
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(CHARACTERISTIC_UUID_RX, BLECharacteristic::PROPERTY_WRITE);
  pCharacteristic->setCallbacks(new MyCallbacks());
  pService->start();
  pServer->getAdvertising()->start();
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);
}

void loop() {

}

void sendMIDI(uint8_t messageType, uint8_t channel, uint8_t data1, uint8_t data2) {
  channel--;  // Decrement the channel, because MIDI channel 1 corresponds to binary channel 0
  uint8_t statusByte = messageType | channel;  // Combine the messageType (high nibble) 
                                               // with the channel (low nibble)
                                               // Both the message type and the channel should be 4 bits wide
  
  Serial2.write(statusByte);
  Serial2.write(data1);
  Serial2.write(data2);

  Serial.println(data1);
}
    
