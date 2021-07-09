export default function(ctx, stat, confidence) {
	const rs = stat.rs,
				va = stat.Q( .5*(1-confidence) ),
				vb = stat.Q( .5*(1+confidence) ),
				Kx = ctx.canvas.width/(vb-va),
				Ky = ctx.canvas.height*(stat.Q(0.75)-stat.Q(0.25)) / rs[rs.length-1]

	ctx.save()
	ctx.setTransform(1, 0, 0, -1, -va*Kx, ctx.canvas.height)
	plotf(ctx, stat, Kx, Ky)
	ctx.globalCompositeOperation = 'destination-out'
	ctx.fill()
	ctx.restore()
	ctx.stroke()
	ctx.beginPath()
}

function plotf(ctx, stat, Kx, Ky) {
	const rs = stat.rs,
				vs = stat.vs

	let x=vs[0] * Kx
	ctx.beginPath()
	ctx.moveTo( x, 0 )
	for (let i=0, j=1, y=0; j<rs.length; i=j++) {
		ctx.lineTo( x, y = (rs[j]-rs[i])/(vs[j]-vs[i]) * Ky ) //up
		ctx.lineTo( x = vs[j] * Kx, y ) //right
	}
	ctx.lineTo( x, 0 )
}
