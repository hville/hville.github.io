# comminution

![comminution](readme.svg)

Provide a granulometry curve of coffee grinds by comparing them with a reference object.

[https://en.wikipedia.org/wiki/Particle-size_distribution]

* user uploads a picture or takes a picture
* user specified what the biggest object is (penny, dime, quarter, ...)
* app approximates the distribution of particules, counting size and numbers
* display a log distribution graph

## concept

* compare grinders and grind settings with a phone, no sieves or lab
* grinds spread on a plain light surface, next to a coin
* everything done in the browser: the picture never leaves the device

## how

* draw the picture on a canvas, read the pixels
* dark pixels = grinds, light pixels = background (threshold)
* group touching dark pixels into particles, count the pixels of each
* biggest group = the coin: its known diameter gives the mm per pixel
* particle size = diameter of a circle of the same area
* graph: size on a log axis, cumulative % passing

## results to show

* the curve
* key sizes: D10, D50, D90
* particle count
* picture with the detected particles outlined, to check the detection

## state of the code

* page shows one sample picture and an empty canvas; no processing yet
* 6 sample pictures in the folder, 2-3 MB each

## open questions

* % by count or by volume (size³)? By volume is the usual sieve curve, but few big particles dominate
* touching or overlapping grinds are counted as one big particle
* smallest size seen = 1 pixel: the fines are missed
* uneven light and shadows: fixed threshold or automatic?
* coin list by country, or type a diameter in mm?
* save the result (not the picture) in the URL to compare two grinds?
