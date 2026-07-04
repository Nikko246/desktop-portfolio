// 1. SELECTING HTML ELEMENTS
const shortcut = document.getElementById('projects-shortcut');
const appWindow = document.getElementById('projects-window');
const closeBtn = document.getElementById('close-btn');
const windowHeader = document.getElementById('window-header');
const clockElement = document.getElementById('clock');

// 2. OPEN AND CLOSE WINDOW LOGIC
shortcut.addEventListener('click', () => {
    appWindow.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    appWindow.style.display = 'none';
});

// 3. DRAGGING WINDOW LOGIC
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

windowHeader.addEventListener('mousedown', dragStart);
document.addEventListener('mousemove', drag);
document.addEventListener('mouseup', dragEnd);

function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;
    
    // Only drag if clicking the header bar
    if (e.target === windowHeader || windowHeader.contains(e.target)) {
        isDragging = true;
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();
        currentX = e.clientX - initialX;
        currentY = e.clientY - initialY;

        xOffset = currentX;
        yOffset = currentY;

        // Apply new CSS transform styles dynamically
        appWindow.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }
}

function dragEnd() {
    isDragging = false;
}

// 4. LIVE CLOCK TASKBAR LOGIC
function updateClock() {
    const now = new Date();
    clockElement.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();