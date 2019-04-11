/************************************************
* esp mandel ble
* dallin williams - 11 apr 2019
*
* draws mandelbrot sets on the wrover display,
* the color value can be manipulated over ble.
*
*/

#include <BLEDevice.h>
#include <BLEServer.h>
#include <BLEUtils.h>
#include <BLE2902.h>
#include <SPI.h>
#include <Adafruit_GFX.h>    // Core graphics library
#include <WROVER_KIT_LCD.h> // Hardware-specific library

#define DARKGREY 0x2145
#define SERVICE_UUID           "6E400001-B5A3-F393-E0A9-E50E24DCCA9E" // UART service UUID
#define CHARACTERISTIC_UUID_RX "6E400002-B5A3-F393-E0A9-E50E24DCCA9E"
#define CHARACTERISTIC_UUID_TX "6E400003-B5A3-F393-E0A9-E50E24DCCA9E"

BLECharacteristic *pCharacteristic;
bool deviceConnected = false;
const int LED = 2;
const int ON = 1;
const int OFF = 0;
const int MAX_CHANNEL = 6;
int vals[MAX_CHANNEL+1];
const int ON_CHANNEL = 1;
const int RAND_CHANNEL = 2;
const int R = 3;
const int G = 4;
const int B = 5;
const int RESET = 6;

WROVER_KIT_LCD tft;
int num_rows = tft.width();
int num_cols = tft.height();
float min_x, max_x, min_y, max_y;
int zoom;
int started = 0;

void default_vals(void){
  min_x = -2.5;
  max_x = 1.0;
  min_y = -1.0;
  max_y = 1.0;
  zoom = 1;
}

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
  BLEDevice::init("ESP32 UART Test");
  BLEServer *pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  BLEService *pService = pServer->createService(SERVICE_UUID);
  pCharacteristic = pService->createCharacteristic(CHARACTERISTIC_UUID_TX, BLECharacteristic::PROPERTY_NOTIFY);              
  pCharacteristic->addDescriptor(new BLE2902());
  BLECharacteristic *pCharacteristic = pService->createCharacteristic(CHARACTERISTIC_UUID_RX, BLECharacteristic::PROPERTY_WRITE);
  pCharacteristic->setCallbacks(new MyCallbacks());
  pService->start();
  pServer->getAdvertising()->start();
  Serial.println("Waiting a client connection to notify...");

  tft.begin();
  tft.fillScreen(DARKGREY);
  default_vals();
  vals[ON_CHANNEL] = OFF;
}

void loop() {
  if (deviceConnected) {
    // on btn has been clicked: draw once
    if(vals[ON_CHANNEL == ON])
    {
      mandelbrot();
      vals[ON_CHANNEL] = OFF;
    }
    // switch is on: draw continually
    else if(vals[RAND_CHANNEL] == ON)
    {
      mandelbrot();
    }
    // reset btn has been clicked: clear screen
    else if(vals[RESET] == ON)
    {
      tft.fillScreen(DARKGREY);
      vals[RESET] = OFF;
    }
  }
}

void parseCandV(String rx)
{ 
  int pos = rx.indexOf(",");
  int c = rx.substring(0, pos).toInt();
  int v = rx.substring(pos+1).toInt();
  //scale down slider val from 0-1024 to 0-18
  if(c>2)
    v = (int) (v / 57);

  //toggle the switch value
  if(c==2)
    vals[c] ^= 1;
  else
    vals[c] = v;
}

unsigned long mandelbrot(){
  unsigned long counter = micros();
  started = 1;
  int i, j;
  float x, y;
  float x0, y0;
  float xtemp, ytemp;
  int iteration;
  int max_iteration = 100;

  //draw a mandelbrot
  for (i = 0; i < num_rows; i++) 
  {
    for (j = 0; j < num_cols; j++) 
    {     
      x = 0;
      y = 0;
      //scaled x and y coordinates
      x0 = j/320.0*(max_x - min_x) + min_x;
      y0 = (239.0-i)/240.0*(max_y - min_y) + min_y;
      iteration = 0;

      // using periodicity shortcut
      while (x*x + y*y < 4  &&  iteration < max_iteration) 
      {
        xtemp = x*x - y*y + x0;
        ytemp = 2*x*y + y0;
        if (x == xtemp  &&  y == ytemp) 
        {
          iteration = max_iteration;
          break;
        }
        x = xtemp;
        y = ytemp;
        iteration++;
      }
      //for black
      if(iteration == max_iteration) {
        tft.drawPixel(i, j, 0);
      }       
      else 
      {
          short color = ((((iteration*vals[R]) & 0xF8) << 8) | (((iteration*vals[G]) & 0xFC) << 3) | ((iteration*vals[B]) >> 3)) &0xFFFF;
          tft.drawPixel(i, j, color);
      }
    }
  }
  return micros() - counter;
}
    
