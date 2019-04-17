#include <Audio.h>

#define HWSERIAL Serial1
#define NUM_VOICES 4
const int start = 0b1111111;

//audio
AudioSynthWaveform       waveforms[NUM_VOICES];
AudioOutputI2S           headphones;         
AudioMixer4              mixer;

AudioConnection          patchCord1(waveforms[0], 0, mixer, 0);
AudioConnection          patchCord2(waveforms[1], 0, mixer, 1);
AudioConnection          patchCord3(waveforms[2], 0, mixer, 2);
AudioConnection          patchCord4(waveforms[3], 0, mixer, 3);
AudioConnection          patchCordL(mixer, 0, headphones, 0);

AudioControlSGTL5000     sgtl5000_1;     


float vol = 0.5;
int NUM_NOTES = 25;                    //size of penta[]
int SCALE = 127/(NUM_NOTES);           // scale midi input (0-127) to arr size

//pentatonic scale frequencies
int penta[] = {65, 73, 82, 98, 110,
               131, 147, 165, 196, 220,
               262, 294, 330, 392, 440,
               523, 587, 659, 784, 880,
               1047, 1175, 1319, 1568, 1760};

void setup() {
  //initialize audio
  AudioMemory(20);
  sgtl5000_1.enable();
  sgtl5000_1.volume(0.8);

  waveforms[0].begin(WAVEFORM_SINE);
  waveforms[0].amplitude(0.3);
  waveforms[1].begin(WAVEFORM_TRIANGLE_VARIABLE);
  waveforms[1].amplitude(0.2);
  waveforms[2].begin(WAVEFORM_TRIANGLE);
  waveforms[2].amplitude(0.15);
  waveforms[3].begin(WAVEFORM_SQUARE);
  waveforms[3].amplitude(0.1);
  

  Serial.begin(9600);
  HWSERIAL.begin(9600);
}

void loop() {
  int incomingByte;
  int channel;
  int value;
  if (HWSERIAL.available() > 0) 
  {
    incomingByte = HWSERIAL.read();
    if(incomingByte == start)
    {
      channel = HWSERIAL.read();
      Serial.println(channel);
      if(channel > 4)
      {
        channel -= 10; //convert to array indices
        value = HWSERIAL.read();
        value/=SCALE;
        waveforms[channel].frequency(penta[value]);
      }
      else
      {
        Serial.print("mute");
        waveforms[channel-1].frequency(0);
      }
    }
  }
}
