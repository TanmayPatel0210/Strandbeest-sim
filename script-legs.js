const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")

const trailCanvas = document.getElementById("trailCanvas")
const trailCtx = trailCanvas.getContext("2d")



const pointA = {x:230, y:325}
const groundAnchor = {x:230 + (100*2), y:325}

const rod_AB = 38 * 2
const rod_BD = 83 * 2
const rod_CD = 76 * 2
const rod_AD = 124 * 2
const rod_DE = 111 * 2
const rod_CE = 79 * 2
const rod_EF = 131 * 2
const rod_GF = 80 * 2
const rod_BG = 105 * 2
const rod_CG = 49 * 2
const rod_GH = 110 * 2
const rod_FH = 115 * 2

let isPaused = false
let angle = 0

function getPoint(p1, p2, r1, r2, sign = 1)
{
    let dx = p2.x - p1.x
    let dy = p2.y - p1.y
    let d = Math.sqrt(dx*dx + dy*dy)
    if (d>r1+r2 || d<Math.abs(r1-r2)) return {x:0, y:0}
    let a = (r1*r1 - r2*r2 + d*d)/(2*d)
    let h = Math.sqrt(r1 * r1 - a * a)
    return{
        x: p1.x + (a/d) * dx + sign * (h/d) * dy,
        y: p1.y + (a / d) * dy - sign * (h / d) * dx
    }
}

function drawLeg(angleOffset)
{



    let B = {
        x: pointA.x +rod_AB * Math.sin(angle + angleOffset),
        y: pointA.y + rod_AB * Math.cos(angle + angleOffset)
    }
    let D = getPoint(B, groundAnchor, rod_BD, rod_CD, 1)
    let G = getPoint(B, groundAnchor, rod_BG, rod_CG, -1)
    let E = getPoint(D, groundAnchor, rod_DE, rod_CE, 1)
    let F = getPoint(E, G, rod_EF, rod_GF, 1)
    let H = getPoint(G, F, rod_GH, rod_FH, -1)







    function drawRod(p1, p2, color = "white")
    {
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.stroke()
    }

    drawRod(pointA, B, "red")
    drawRod(B, D, "cyan")
    drawRod(B, G, "cyan")
    drawRod(groundAnchor, D, "blue")
    drawRod(groundAnchor, G, "blue")
    drawRod(D, E, "magenta")
    drawRod(groundAnchor, E, "magenta")
    drawRod(E, F, "green")
    drawRod(G, F, "green")
    drawRod(G, H, "yellow")
    drawRod(F, H, "yellow")

    function drawPoint(p, color)
    {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.fill()
    }

    drawPoint(pointA, "white")
    drawPoint(groundAnchor, "white")
    drawPoint(B, "red")
    drawPoint(D, "cyan")
    drawPoint(G, "cyan")
    drawPoint(E, "magenta")
    drawPoint(F, "green")
    drawPoint(H, "yellow")

    trailCtx.fillStyle = "rgba(0, 0, 0, 0.02)"
    trailCtx.fillRect(0, 0, canvas.width, canvas.height)

    trailCtx.beginPath()
    trailCtx.arc(H.x, H.y, 2, 0, Math.PI*2)
    trailCtx.fillStyle = "rgba(255, 255, 0, 0.8)"

    trailCtx.fill()

    




}


function draw()
{

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    let speed = document.getElementById("slider").value

    drawLeg(0)
    drawLeg(Math.PI/2)
    drawLeg(Math.PI)
    drawLeg(Math.PI*1.5)

    if (isPaused) return

    angle += parseFloat(speed)
    requestAnimationFrame(draw)
}

draw()




document.getElementById("pauseBtn").addEventListener("click", function()
                                                            {
                                                                if(isPaused == false)
                                                                {
                                                                    isPaused = true
                                                                    

                                                                }
                                                                else
                                                                {
                                                                    isPaused = false
                                                                    draw()
                                                                }
                                                            })

