const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

//In HTML, We must provide height,width
const CANVAS_SIZE = 700;
const INITIAL_COLOR = "#000000";

context.width = CANVAS_SIZE;
context.height = CANVAS_SIZE;

context.fillStyle = "whitesmoke";
context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

context.strokeStyle = INITIAL_COLOR;
context.fillStyle = INITIAL_COLOR;

context.lineWidth = 5.0;

let painting = false;
let filling = false;

const handleCM = () => {
    event.preventDefault();
};

const handleCanvasClick = () => {
    if (filling) {
        context.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
};

const handleModeClick = () => {
    if (filling === true) {
        filling = false;

        mode.innerText = "Fill";
    } else {
        filling = true;

        mode.innerText = "Paint";
    }
};

const handleInputRange = (event) => {
    const strokeWidth = event.target.value;
    context.lineWidth = strokeWidth;
};

const handleClickColor = (event) => {
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;
    context.fillStyle = color;
};

const startPainting = () => {
    painting = true;
};

const stopPainting = () => {
    painting = false;
};

const onMouseMove = (event) => {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        context.beginPath();
        context.moveTo(x, y);
    } else {
        context.lineTo(x, y);
        context.stroke();
    }
};

const handleSaveClick = () => {
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "myimage.png";
    link.click();
};

if (colors) {
    Array.from(colors).forEach((color) =>
        color.addEventListener("click", handleClickColor)
    );
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if (range) {
    range.addEventListener("input", handleInputRange);
}

if (mode) {
    mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick);
}
