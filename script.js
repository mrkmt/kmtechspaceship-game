const canvas = document.getElementById("puzzleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

const img = new Image();
img.src = "puzzle-image.jpg";  // Replace with puzzle image
img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};
