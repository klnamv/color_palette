function getRandomColor(){
    return Math.floor(Math.random()*16777215).toString(16);
}

function changeColors(containerId, colorId){
    let randomColor = getRandomColor();
    const elem = document.getElementById(containerId);
    elem.style.background = '#' + randomColor;
    const col = document.getElementById(colorId);
    col.innerHTML = randomColor;
}

function changeAllColors(){
    changeColors('randcolor1', 'color1');
    changeColors('randcolor2', 'color2');
    changeColors('randcolor3', 'color3');
    changeColors('randcolor4', 'color4'); 
    changeColors('randcolor5', 'color5');
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