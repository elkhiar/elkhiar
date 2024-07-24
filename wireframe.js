const canvas = document.getElementById('wireframeCanvas');
const ctx = canvas.getContext('2d');

// Ajuster la taille du canvas pour qu'il couvre toute la fenêtre
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const points = [];
const pointCount = 500; // Augmenter le nombre de points pour plus de densité
const speed = 0.3; // Ajuster la vitesse des points pour une animation plus fluide
const connectionDistance = 150; // Ajuster la distance de connexion pour une apparence plus aérée

// Initialiser les points avec une vitesse aléatoire
for (let i = 0; i < pointCount; i++) {
    points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        dx: (Math.random() - 0.5) * speed,
        dy: (Math.random() - 0.5) * speed,
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Effacer le canvas
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; // Couleur des lignes avec transparence
    ctx.lineWidth = 0.6; // Épaisseur des lignes

    // Dessiner les connexions entre les points
    for (let i = 0; i < pointCount; i++) {
        const point = points[i];
        point.x += point.dx;
        point.y += point.dy;

        // Rebondir les points aux bords du canvas
        if (point.x < 0 || point.x > canvas.width) point.dx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.dy *= -1;

        for (let j = i + 1; j < pointCount; j++) {
            const otherPoint = points[j];
            const distance = Math.hypot(point.x - otherPoint.x, point.y - otherPoint.y);
            if (distance < connectionDistance) {
                const alpha = 1 - distance / connectionDistance;
                ctx.globalAlpha = alpha * 0.5; // Ajuster l'opacité
                ctx.beginPath();
                ctx.moveTo(point.x, point.y);
                ctx.lineTo(otherPoint.x, otherPoint.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(draw); // Recréer l'animation
}

draw();
