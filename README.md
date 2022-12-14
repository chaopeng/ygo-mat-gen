# YGO PLAYMAT GENERATOR

## Why?

I am a big fan of YuGiOh trading card game. I want to have unique playmats with
zone, I have search templates online but none of them fit my requirement. I
know how to make a zone template with photo editor, but it is a lot of work to
make it perfectly align. Zones are just rectangles why not draw they with SVG.

## Size

If you shop on Taobao, Aliexpress, Ebay for playmat, they will give you a
playmat in 610mm x 360mm, a little bit smaller than official playmat but it is
OK if the zone are matched, you don't want the EX zone not match.

Some measurement from my playmat (I:P Masquerena):

- per slot size: 85mm x 58mm, card without sleeve is 86mm x 59mm
- gaps for slots: horizontal is 28mm, vertical is 6mm

For printing, we want 300 DPI, ~12 pixels per mm, 610mm x 360mm = 7320 pixels
x 4320 pixels.

## How to use

You will need to run a http server to use this tool. Then access index.html.
I also host an online version, you can access on: https://ygomat.chaopeng.me.

## Example

### With banish zone
![](examples/example-1-small.png)

### Change color for Pendulum zone
![](examples/example-2-small.png)

### Generated with background picture

Photo Credit: [NASA](https://images.nasa.gov/details-PIA12348)

![](examples/example-3-small.png)

## License

Apache-2.0