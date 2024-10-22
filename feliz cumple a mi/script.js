const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');
const confettiButton = document.getElementById('confettiButton');

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

const confettiPieces = [];
const colors = ['#ff4081', '#3f51b5', '#009688', '#ff9800', '#9c27b0'];

function createConfetti() {
    for (let i = 0; i < 200; i++) {
        confettiPieces.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            size: Math.random() * 5 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            speed: Math.random() * 3 + 1,
            angle: Math.random() * 2 * Math.PI,
            rotation: Math.random() * 360,
            rotationSpeed: Math.random() * 10 - 5
        });
    }
}

function drawConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiPieces.forEach((piece, index) => {
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate(piece.rotation * Math.PI / 180);
        ctx.fillStyle = piece.color;
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size);
        ctx.restore();

        piece.y += piece.speed;
        piece.x += Math.sin(piece.angle) * 2;
        piece.rotation += piece.rotationSpeed;

        if (piece.y > confettiCanvas.height) {
            confettiPieces.splice(index, 1);
        }
    });

    if (confettiPieces.length > 0) {
        requestAnimationFrame(drawConfetti);
    }
}

confettiButton.addEventListener('click', () => {
    createConfetti();
    drawConfetti();
});

window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});
