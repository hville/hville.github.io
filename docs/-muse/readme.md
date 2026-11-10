# muse

Exploring the idea that the notes of a melody are the quantized and dithered representation of underlying pitch and intensity curves. The music scale represents the quantization levels.
![muse](readme.svg)

## Goal
[ ] Convert 

## DAC: MIDI notes => frequency domain

channel (0-15) => each processed seperatly
duration (ticks) => the x axis for both pitch and intensity
pitch (0-127) => Fourier transform (pitch)
intensity (0-127) => Fourier transform (intensity)

## TODO
[ ] use MIDI 1.0 or 2.0? Nice to have non-tempered scales

## Other tools and ideas
https://www.justinsalamon.com/melody-extraction.html
http://justinsalamon.weebly.com/uploads/4/3/9/4/4394963/salamongomezmelodytaslp2012.pdf
polyphonic (or homophonic) music predominant melodic line pitch (fundamental frequency)
- Melody extraction
- Audio Melody Extraction
- Predominant Melody Extraction
- Predominant Melody Estimation
- Predominant Fundamental Frequency (F0) Estimation
frequency and pitch are related, they are not the same thing
