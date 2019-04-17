# ESP32 Examples #

a few examples of systems this app could be integrated into.

* db_template: template for ble input from the app
* ble_mandelbrot: draws mandelbrot sets, rgb channel saturation and other factors are controllable from the app.
* ble_midi: reads in channel and value and packs it into MIDI commands; these are sent out over serial. in conjunction with the app this can be used as a simulated MIDI controller for a variety of electronic music applications.
* synth: an example synth project that uses an esp32 ble receiver to control a 4-voice pentatonic synthesizer.