# muse

![muse](readme.svg)

Exploring the idea that the notes of a melody are the quantized and dithered representation of underlying pitch and intensity contours. The music scale represents the quantization levels.

Words used here:
* *pitch*: the height of a note (MIDI 0-127, or Hz)
* *contour*: how a value (pitch or intensity) changes over time

## Goals

### primary goals

* Convert a user supplied melody of discrete notes (typed as text or MIDI file) to continuous pitch and intensity contours (DAC)
* From a user supplied scale, key or pitch collection convert the contours back into another set of notes (MIDI or other) (ADC)
* Play any combination of all 3 versions
* Learn about music along the way ;)

### secondary goals

* Visualization of all 3 versions

### future

* Handle multiple tracks or channels (processed independently)
* Handle non-tempered scales
* Polyphonic melody extraction from a sample to a multi-track MIDI

## Method

### Reconstruction (DAC): MIDI notes => contours

* channel (0-15) => each processed separately
* duration (ticks) => the x axis for both pitch and intensity
* pitch (0-127) => pitch contour. A silence has no pitch: the interpolation skips over it
* intensity (0-127) => intensity contour. A silence is 0
* interpolation method: open, to be tested. Requirements:
  - the curve overshoots and undershoots the actual values
  - quantizing the curve on the same scale gives a result somewhat similar to the original

### Quantization (ADC): contours => MIDI notes

* channel (0-15) => each processed separately
* fastest change in the contours => sets the lowest duration (ticks)
  - [ ] ¿ set the ticks finer to allow future dithering?
* for every tick, quantize the value to the closest allowed MIDI pitch (0-127) and intensity (0-127).
  - [ ] how to decide between a long note and a drone of repeated identical notes? Maybe the intensity curve provides the clue?
* output as MIDI 1.0 (MIDI 2.0 dropped). Non-tempered scales later, e.g. with pitch bend

## muse (v1)

Keep the first version simple. Ideas for later wait until we learn from v1 (`muse2/`).

* one melody line (monophonic)
* input typed as text (fits in the URL), plus simple MIDI file import
* equal temperament only. The scale is the notes of one octave, e.g. `C D E G A`
* contours with one interpolation setting, sampled on a grid of ticks, quantized to the nearest note of the scale, equal consecutive notes merged
* play all 3 versions: original notes, continuous contours (glide), new notes
* one combined picture of the 3 versions
* everything saved in the URL
* built-in check: same scale with no smoothing gives back the original melody
