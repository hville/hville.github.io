export default function(ctx, stat, xMin, xMax) {
	ctx.save()
	stat.plotf(ctx, xMin, xMax)
	ctx.globalCompositeOperation = 'destination-out'
	ctx.fill()
	ctx.restore()
	ctx.stroke()
}
