/************************************************
* ble midi packer
* dallin williams - 11 apr 2019
*
* esp32 program to convert between ble input and midi output
*
*/

#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <SPI.h>

#define RXD2 16
#define TXD2 17

const uint8_t NOTE_OFF = 0x80;
const uint8_t NOTE_ON = 0x90;
const int ON = 1;
const int OFF = 0;
const int VEL = 0b1011010; // 90

BLECharacteristic *pCharacteristic;

#define SERVICE_UUID           "6E400001-B5A3-F393-E0A9-E50E24DCCA9E" // UART service UUID
#define CHARACTERISTIC_UUID_RX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_TX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

class MyServerCallbacks: public BLEServerCallbacks {
    void onConnect(BLEServer* pServer) {
      deviceConnected = true;
    };

    void onDisconnect(BLEServer* pServer) {
      deviceConnected = false;
    }
};

class MyCallbacks: public BLECharacteristicCallbacks {
    void onWrite(BLECharacteristic *pCharacteristic) 
    {
      std::string rxValue = pCharacteristic->getValue();
      if (rxValue.length() > 0)
      {
        parseCandV(rxValue.c_str());
      }
    }
};

void setup() {
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

  vals[ON_CHANNEL] = OFF;
  Serial2.begin(9600, SERIAL_8N1, RXD2, TXD2);
}

void loop() {

}

void parseCandV(String rx)
{ 
  int pos = rx.indexOf(",");
  int c = rx.substring(0, pos).toInt();
  int v = rx.substring(pos+1).toInt();
  if(v == 0)
  {
    sendMIDI(NOTE_OFF, c, v, VEL);
  }
  else
  {
    sendMIDI(NOTE_ON, c, v, VEL);
  }
}

void sendMIDI(uint8_t messageType, uint8_t channel, uint8_t data1, uint8_t data2) {
  channel--;  // Decrement the channel, because MIDI channel 1 corresponds to binary channel 0
  uint8_t statusByte = messageType | channel;  // Combine the messageType (high nibble) 
                                               // with the channel (low nibble)
                                               // Both the message type and the channel should be 4 bits wide
  Serial2.write(statusByte);
  Serial2.write(data1);
  Serial2.write(data2);
}
    
