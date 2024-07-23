const canvas = document.getElementById('wireframeCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const points = [];
const pointCount = 200;
const speed = 0.5;
const connectionDistance = 100;

for (let i = 0; i < pointCount; i++) {
    points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * speed,
        dy: (Math.random() - 0.5) * speed,
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 0.5;

    for (let i = 0; i < pointCount; i++) {
        const point = points[i];
        point.x += point.dx;
        point.y += point.dy;

        if (point.x < 0 || point.x > canvas.width) point.dx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.dy *= -1;

        for (let j = i + 1; j < pointCount; j++) {
            const otherPoint = points[j];
            const distance = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y);
            if (distance < connectionDistance) {
                ctx.globalAlpha = 1 - distance / connectionDistance;
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(otherPoint.x, otherPoint.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(draw);
}

draw();
