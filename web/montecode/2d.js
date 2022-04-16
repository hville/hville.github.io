export default function(ctx, stat, confidence) {
	const rs = stat.rs,
				va = stat.Q( .5*(1-confidence) ),
				vb = stat.Q( .5*(1+confidence) ),
				Kx = ctx.canvas.width/(vb-va),
				Ky = ctx.canvas.height / rs[rs.length-1] * (vb-va)/5 //*(stat.Q(0.9)-stat.Q(0.1))

	ctx.save()
	stat.plotf(ctx)
	ctx.globalCompositeOperation = 'destination-out'
	ctx.fill()
	ctx.restore()
	ctx.stroke()
}
