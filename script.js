const canvas = document.getElementById("myCanvas")
const ctx = canvas.getContext("2d")

const pointA = {x:270, y:300}
let pointB = {x:500, y:300}
let isDragging = false
let grabbingradius = 15
let rodLength = 170
let angle = 0
const groundAnchor = {x:350, y:300 }
const rod2 = 170
const rod3 = 170

function draw()
{
ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
ctx.fillRect(0, 0, canvas.width, canvas.height)

    //calc for point B

    pointB.x = pointA.x + rodLength*Math.cos(angle)
    pointB.y = pointA.y + rodLength*Math.sin(angle)
    angle += 0.05

    //point C draw

    let pointC = getPointC(pointB, groundAnchor)
    
    
    ctx.beginPath()
    ctx.arc(pointC.x, pointC.y, 10, 0, Math.PI*2)
    ctx.fillStyle = "green"
    ctx.fill()

    //rods

    ctx.beginPath()
    ctx.moveTo(groundAnchor.x, groundAnchor.y)
    ctx.lineTo(pointC.x, pointC.y)
    ctx.strokeStyle = "white"
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(pointA.x, pointA.y)
    ctx.lineTo(pointB.x, pointB.y)
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.stroke()

    // draw rod B to C
    ctx.beginPath()
    ctx.moveTo(pointB.x, pointB.y)
    ctx.lineTo(pointC.x, pointC.y)
    ctx.strokeStyle = "white"
    ctx.stroke()

    // pointA blue, pointB red, groundAnchor yellow
    ctx.beginPath()
    ctx.arc(pointA.x, pointA.y, 10, 0, Math.PI*2)
    ctx.fillStyle = "blue"
    ctx.fill()

    ctx.beginPath()
    ctx.arc(groundAnchor.x, groundAnchor.y, 10, 0, Math.PI*2)
    ctx.fillStyle = "yellow"
    ctx.fill()



    requestAnimationFrame(draw)
}

draw()

//calc for point C

function getPointC(pointB, groundAnchor)
{
    let dx = groundAnchor.x - pointB.x
    let dy = groundAnchor.y - pointB.y
    let d = Math.sqrt(dx*dx + dy*dy)
    let a = ((rod2*rod2 - rod3*rod3 + d*d)/(2*d))
    let h = Math.sqrt(rod2*rod2 - a*a)

    if (isNaN(h)) return {x: 0, y: 0}


return{
    x:  pointB.x + (a/d)*dx + (h/d)*dy, y:  pointB.y + (a/d)*dy - (h/d)*dx
    }
}
