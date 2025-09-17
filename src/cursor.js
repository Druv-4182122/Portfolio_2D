
const cursor = document.querySelector("#cursor");
const cursorBorder = document.querySelector("#cursor-border");
const cursorPos = { x: -100, y: -100 }; // Start the cursor offscreen
const cursorBorderPos = { x: -100, y: -100 }; // Start the cursorBorder offscreen

cursor.style.backgroundColor = "white";
cursor.style.display="none";
cursorBorder.style.border = "none";

cursor.style.setProperty("--size2", "8px");

cursorBorder.style.backgroundColor = "#f7f8fa";
cursor.style.zIndex = "5";
cursorBorder.style.zIndex = "1";
// Hide the cursor and cursorBorder initially
cursor.style.opacity = 0;
cursorBorder.style.opacity = 0;

// Spring animation constants
const stiffness = 0.15; // Adjust stiffness for bounce effect
const damping = 0.8; // Adjust damping for bounce effect
let velocityX = 0;
let velocityY = 0;

document.addEventListener("mousemove", (e) => {
    cursor.style.opacity = 1; // Make the cursor visible
    cursorBorder.style.opacity = 1; // Make the cursorBorder visible

    cursorPos.x = e.clientX;
    cursorPos.y = e.clientY;

    cursor.style.transition = "none";
    cursorBorder.style.transition = "none";
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

requestAnimationFrame(function loop() {
    if (cursor.style.opacity === "1") {
        // Spring animation calculation
        const dx = cursorPos.x - cursorBorderPos.x;
        const dy = cursorPos.y - cursorBorderPos.y;
        const ax = dx * stiffness;
        const ay = dy * stiffness;
        velocityX += ax;
        velocityY += ay;
        velocityX *= damping;
        velocityY *= damping;
        cursorBorderPos.x += velocityX;
        cursorBorderPos.y += velocityY;

        // Decrease the cursorBorder size while moving
        const cursorBorderSize = parseFloat(cursorBorder.style.getPropertyValue("--size"));
        const targetSize = 13; // Adjust this value for the desired thin size
        const sizeChangeSpeed = 0.05; // Adjust this value for the speed of size change
        const newSize = cursorBorderSize + (targetSize - cursorBorderSize) * sizeChangeSpeed;
        cursorBorder.style.setProperty("--size", `${newSize}px`);

        cursorBorder.style.transform = `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`;
    } else {
        // Reset the cursorBorder size when not moving
        cursorBorder.style.setProperty("--size", "15px");
    }
    requestAnimationFrame(loop);
});

document.querySelectorAll("[data-cursor]").forEach((item) => {
    item.addEventListener("mouseover", (e) => {
        if (cursor.style.opacity === "1") { // Only change styles if the cursor is visible
            if (item.dataset.cursor === "pointer") {
                cursorBorder.style.setProperty("--size", "50px");
                cursorBorder.style.backgroundColor = "rgba(255, 255, 255, .3)";
                cursor.style.display = "none";
            }
            if (item.dataset.cursor === "pointer2") {
                cursorBorder.style.backgroundColor = "white";
                cursorBorder.style.mixBlendMode = "difference";
                cursorBorder.style.setProperty("--size", "80px");
            }
        }
    });
    item.addEventListener("mouseout", (e) => {
        if (cursor.style.opacity === "1") { // Only change styles if the cursor is visible
            cursorBorder.style.backgroundColor = "#f7f8fa";
            cursor.style.display = "none";
        }
    });
});