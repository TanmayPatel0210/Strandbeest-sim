const steps = document.querySelectorAll('.scroll');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.3
});

steps.forEach(step => {
    observer.observe(step);
});

const canvas = document.getElementById("legdiagram");
const ctx = canvas.getContext("2d")


const pointA = {x:80, y:160}
const groundAnchor = {x:80 + 100, y:160}

const rod_AB = 38 
const rod_BD = 83 
const rod_CD = 76 
const rod_AD = 124
const rod_DE = 111
const rod_CE = 79 
const rod_EF = 131
const rod_GF = 80 
const rod_BG = 105
const rod_CG = 49 
const rod_GH = 110
const rod_FH = 115



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

function drawRod(p1, p2, color) 
    {
        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        ctx.stroke()
    }
function drawPoint(p, color) 
    {
        ctx.beginPath()
        ctx.arc(p.x, p.y, 5, 0, Math.PI*2)
        ctx.fillStyle = color
        ctx.fill()
    }

let angle = Math.PI 
let B = {
    x: pointA.x + rod_AB * Math.sin(angle),
    y: pointA.y + rod_AB * Math.cos(angle)
}

let D = getPoint(B, groundAnchor, rod_BD, rod_CD, 1)
let G = getPoint(B, groundAnchor, rod_BG, rod_CG, -1)
let E = getPoint(D, groundAnchor, rod_DE, rod_CE, 1)
let F = getPoint(E, G, rod_EF, rod_GF, 1)
let H = getPoint(G, F, rod_GH, rod_FH, -1)


drawRod(pointA, B, "#ff4444")
drawRod(B, D, "#00ffff")
drawRod(B, G, "#00aaff")
drawRod(groundAnchor, D, "#ff00ff")
drawRod(groundAnchor, G, "#ff8800")
drawRod(D, E, "#00ff88")
drawRod(groundAnchor, E, "#ffff00")
drawRod(E, F, "#0a0095")
drawRod(G, F, "#006f00")
drawRod(G, H, "#ffffff")
drawRod(F, H, "#646464")

drawPoint(pointA, "white")
drawPoint(groundAnchor, "white")
drawPoint(B, "#ff4444")
drawPoint(D, "#00ffff")
drawPoint(G, "#00aaff")
drawPoint(E, "#00ff88")
drawPoint(F, "#44ff44")
drawPoint(H, "#ffff00")