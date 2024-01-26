function getRandomColor(){
    return Math.floor(Math.random()*16777215).toString(16);
}

function toggleLock(containerID, event){
    event.stopPropagation();
    const container = document.getElementById(containerID);
    const isLocked = container.classList.contains('locked');
    container.querySelector('.icon-lock').style.display = isLocked ? 'none' : 'block';
    container.querySelector('.icon-unlock').style.display = isLocked ? 'block' : 'none';
    container.classList.toggle('locked');
}

function changeColors(containerId, colorId){
    const container = document.getElementById(containerId);
    if (!container.classList.contains('locked')) {
        const randomColor = getRandomColor();
        container.style.background = '#' + randomColor;
        const col = document.getElementById(colorId);
        col.innerHTML = randomColor.toUpperCase();
    }
}

function changeAllColors(){
    ['randcolor1', 'randcolor2', 'randcolor3', 'randcolor4', 'randcolor5'].forEach(containerId => {
        const colorId = 'color' + containerId.replace('randcolor', '');
        changeColors(containerId, colorId);
    });
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' && event.target === document.body) {
        event.preventDefault(); 
        changeAllColors();
    }
});

window.onload = changeAllColors;

function copyToClipboard(colorId, event) {
    event.stopPropagation();
    const colorText = document.getElementById(colorId).textContent;
    navigator.clipboard.writeText(`#${colorText}`).then(() => {
        alert("Color code copied to clipboard!");
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

let sourceId;

function dragStart(event) {
    sourceId = event.target.id;
    event.target.classList.add('dragging');
    event.dataTransfer.setData("text/plain", event.target.id);
}

function allowDrop(event) {
    event.preventDefault(); 
}

function drop(event) {
    event.preventDefault();
    const targetId = event.target.id;
    const sourceColor = document.getElementById(sourceId).style.backgroundColor;
    const targetColor = document.getElementById(targetId).style.backgroundColor;

    document.getElementById(sourceId).style.backgroundColor = targetColor;
    document.getElementById(targetId).style.backgroundColor = sourceColor;

    const sourceColorCode = document.getElementById(sourceId).querySelector('.color-code').textContent;
    const targetColorCode = document.getElementById(targetId).querySelector('.color-code').textContent;
    document.getElementById(sourceId).querySelector('.color-code').textContent = targetColorCode;
    document.getElementById(targetId).querySelector('.color-code').textContent = sourceColorCode;
}

function dragEnd(event) {
    event.target.classList.remove('dragging');
}

document.querySelectorAll('.color-container').forEach(container => {
    container.addEventListener('dragend', dragEnd);
});