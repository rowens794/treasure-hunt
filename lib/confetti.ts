import confetti from "canvas-confetti";

export const runConfetti = () => {
  confetti({
    particleCount: 300,
    startVelocity: 60, // Increase initial velocity
    spread: 80,
    gravity: 0.5, // Decrease gravity
    decay: 0.9, // Slow down decay
    origin: { y: 0.9 },
    colors: ["#000000", "#FFFFFF", "#808080", "#C0C0C0", "#F0F0F0"],
  });
};
