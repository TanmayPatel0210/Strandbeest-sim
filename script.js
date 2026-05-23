const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d")

const pointA = {x:300, y:300}
const groundAnchor = {x:376, y:300}

const rod_AB = 38
const rod_BD = 83
const rod_CD = 76
const rod_AD = 124
const rod_DE = 111
const rod_CE = 79
const rod_EF = 131
const rod_GF = 87
const rod_BG = 107
const rod_CG = 49
const rod_GH = 100
const rod_FH = 122

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

function draw()
{
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    let B = {
        x: pointA.x +rod_AB * Math.cos(angle),
        y: pointA.y + rod_AB * Math.sin(angle)
    }
    let D = getPoint(B, groundAnchor, rod_BD, rod_CD, 1)
    let G = getPoint(B, groundAnchor, rod_BG, rod_CG, -1)
    let E = getPoint(D, groundAnchor, rod_DE, rod_CE, 1)
    let F = getPoint(E, G, rod_EF, rod_GF, 1)
    let H = getPoint(G, F, rod_GH, rod_FH, 1)

    function drawRod(p1, p2, color = "white")
    {
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.stroke()
    }

    drawPoint(pointA, "white")
    drawPoint(groundAnchor, "white")
    drawPoint(B, "red")
    drawPoint(D, "cyan")
    drawPoint(G, "cyan")
    drawPoint(E, "magenta")
    drawPoint(F, "green")
    drawPoint(H, "yellow")

    angle += 0.02
    requestAnimationFrame(draw)

}

draw()

