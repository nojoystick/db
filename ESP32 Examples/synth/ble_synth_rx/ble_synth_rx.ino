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

static int toggles[] = {0, 0, 0, 0};
const int start = 0b1111111;

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
  //scale value down to 0-127
  v /= 9;
  // channels 10-13 are sliders for volume
  if((c >= 10 && c <= 13) && toggles[c-10] == 1)
  {
   Serial2.write(start);
   Serial2.write(c);
   Serial2.write(v);
  }
  if(c >= 1 && c<=4)
  {
    toggles[c-1] ^= 1;
    if(toggles[c-1] == 0)
    {
       Serial2.write(start);
       Serial2.write(c);
       Serial2.write(0);
    }
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
        parseCandV(rxValue.c_str());
      }
    }
};

void setup() {
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
    
