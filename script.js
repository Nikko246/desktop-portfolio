// 1. OPENING WINDOWS ON DOUBLE CLICK
const shortcuts = document.querySelectorAll('.icon');
let highestZIndex = 10;

shortcuts.forEach(shortcut => {
    shortcut.addEventListener('dblclick', () => {
        const windowId = shortcut.getAttribute('data-window');
        const targetWindow = document.getElementById(windowId);
        
        if (targetWindow) {
            targetWindow.style.display = 'flex';
            bringToFront(targetWindow);
        }
    });
});

// 2. CLOSING WINDOWS
const closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const targetWindow = e.target.closest('.window');
        targetWindow.style.display = 'none';
        
        // Optional: Pause video if the video window is closed
        const videoElement = targetWindow.querySelector('video');
        if (videoElement) {
            videoElement.pause();
        }
    });
});

// Helper function to stack the clicked window on top
function bringToFront(windowElement) {
    highestZIndex++;
    windowElement.style.zIndex = highestZIndex;
}

// 3. UNIVERSAL DRAGGING LOGIC FOR ALL WINDOWS
let activeWindow = null;
let isDragging = false;
let startX, startY, initialLeft, initialTop;

document.querySelectorAll('.window-header').forEach(header => {
    header.addEventListener('mousedown', (e) => {
        activeWindow = header.closest('.window');
        bringToFront(activeWindow);
        isDragging = true;

        startX = e.clientX;
        startY = e.clientY;
        initialLeft = activeWindow.offsetLeft;
        initialTop = activeWindow.offsetTop;
        
        e.preventDefault();
    });
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging || !activeWindow) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    activeWindow.style.left = `${initialLeft + dx}px`;
    activeWindow.style.top = `${initialTop + dy}px`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    activeWindow = null;
});

// 4. LIVE TASKBAR CLOCK
function updateClock() {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();
