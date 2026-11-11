# muse

Exploring the idea that the notes of a melody are the quantized and dithered representation of underlying pitch and intensity curves. The music scale represents the quantization levels.
![muse](readme.svg)

## Goals

### primary goals

* Convert a user supplied MIDI file of discrete notes to a continuous frequency and intensity curves (DAC)
* From a user supplied scale, key or pitch collection convert the continuous frequency and intensity curves back into another set of notes (MIDI or other) (ADC)
* Learn about music along the way ;)

### secondary goals

* Play any combination of all 3 versions
* Visualization of all 3 version

### future

* Handle multiple tracks or channels (processed independently)
* Handle non-tempered scales
* Polyphonic melody extraction from a sample to a multi-track MIDI

## Method

### Reconstruction (DAC): MIDI notes => frequency domain

* channel (0-15) => each processed seperatly
* duration (ticks) => the x axis for both pitch and intensity
* pitch (0-127) => Fourier transform (pitch)
* intensity (0-127) => Fourier transform (intensity)

### Quantization (ADC): frequency domain => MIDI notes 
* channel (0-15) => each processed seperatly
* highest frequency => sets the lowest duration (ticks)
  - [ ] ¿ set the ticks finer to allow future dithering?
* for every tick, quantized the value to the closest allowed MIDI pitch (0-127) and intensity (0-127).
  - [ ] how to decide between a long note and a drone of repeated identical notes? Maybe the intensity curve provides the clue?
  - [ ] use MIDI 1.0 or 2.0? Nice to have non-tempered scales eventually

