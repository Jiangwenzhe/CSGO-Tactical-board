const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');


const brush = document.querySelector('#brush');
const eraser = document.querySelector('#eraser');
const clearCanvas = document.querySelector('#clear');
const mapSelector = document.querySelector('#mapSelector');
const downloadBtn = document.querySelector('#download');
const colorSelector = document.querySelector('.colorSelector>ul');
const lineSelector = document.querySelector('.lineSelector>ul');


let isAllowDrawLine = false;
let isAllowWipeLine = false;
let lineWidth = 4;
let lineColor = '#03FF00';
let backgroundImage_URL = 'https://i.loli.net/2019/04/07/5ca9c13f07dff.jpg';

const burshColor = {
  green: '#03FF00',
  red: '#FF0200',
  yellow: '#FFFF00',
  blue: '#0301FF',
  black: '#000'
}

const linesWidth = {
  thick: 6,
  medium: 4,
  thin: 2,
}

const init = () => {
  make_canvas_background(backgroundImage_URL);
}

const mousePositionOnCanvas = (canvas, x, y) => {
  let rect = canvas.getBoundingClientRect();
  return {
    x: x - rect.left * (canvas.width/rect.width),
    y: y - rect.top * (canvas.height/rect.height)
  }
}

// const draw_canvas_background = (url) => {
//   background_image = new Image();
//   background_image.setAttribute('crossOrigin', 'anonymous');
//   background_image.src = url;
//   background_image.onload = () => {
//     ctx.drawImage(background_image, 0, 0);
//   }
// }

const make_canvas_background = url => {
  canvas.style.backgroundImage = `url(${url})`
}

const drawLine = (startPoint, endPoint) => {
  ctx.beginPath()
  ctx.moveTo(startPoint.x, startPoint.y);
  ctx.lineWidth = lineWidth
  ctx.fillStyle = lineColor;
  ctx.strokeStyle = lineColor;
  ctx.lineTo(endPoint.x, endPoint.y)
  ctx.stroke()
  ctx.closePath()
}

const clearWholeCanvas = () => {
  ctx.clearRect(0, 0, canvas.width,canvas.height);
}

function cloneCanvas(oldCanvas) {

    //create a new canvas
    var newCanvas = document.createElement('canvas');
    var context = newCanvas.getContext('2d');

    //set dimensions
    newCanvas.width = oldCanvas.width;
    newCanvas.height = oldCanvas.height;

    //apply the old canvas to the new one
    context.drawImage(oldCanvas, 0, 0);

    //return the new canvas
    return newCanvas;
}

colorSelector.addEventListener('click', e => {
  if(e.target.value != undefined) {
    let arr = document.querySelectorAll('.colorSelector>ul>li');
    arr.forEach(element => element.className.indexOf('active') ?
    element.classList.remove('active') : undefined);
    lineColor = burshColor[e.target.classList[0]];
    e.target.classList.add('active');
  }
});

lineSelector.addEventListener('click', e => {
  if(e.target.value != undefined) {
    let arr = document.querySelectorAll('.lineSelector>ul>li');
    arr.forEach(element => element.className.indexOf('active') ?
    element.classList.remove('active') : undefined);
    lineWidth = linesWidth[e.target.classList[0]];
    e.target.classList.add('active');
  }
})

eraser.addEventListener('click', () => {
  isAllowWipeLine = true;
  eraser.classList.add('active');
  brush.classList.remove('active');
});

brush.addEventListener('click', () => {
  isAllowWipeLine = false;
  brush.classList.add('active');
  eraser.classList.remove('active');
});

clearCanvas.addEventListener('click', () => {
  clearWholeCanvas();
});

downloadBtn.addEventListener('click', () => {
  ctx.globalCompositeOperation="destination-over";
  background_image = new Image();
  background_image.setAttribute('crossOrigin', 'anonymous');
  background_image.src = backgroundImage_URL;
  background_image.onload = () => {
    ctx.drawImage(background_image, 0, 0);
    let link = document.createElement('a');
    link.href = canvas.toDataURL("image/png");
    link.download = 'CSGO-Tactical.png';
    link.target = '_blank';
    link.click();
    clearWholeCanvas();
    ctx.globalCompositeOperation="source-over";
  }
});

mapSelector.addEventListener('change', e => {
  //清空画布
  clearWholeCanvas();
  let url = `../maps/de_${e.target.value}.jpg`;
  make_canvas_background(url);
});

init();

canvas.onmousedown = e => {
  isAllowDrawLine = true
  //获得鼠标按下的点相对canvas的坐标。
  let lastPoint = mousePositionOnCanvas(canvas, e.clientX, e.clientY);
  canvas.onmousemove = (e) => {
    if (isAllowDrawLine) {
      let newPoint = mousePositionOnCanvas(canvas, e.clientX, e.clientY)
      if(isAllowWipeLine) {
        let { x, y } = newPoint;
        ctx.clearRect(x,y,20,20);
      } else {
        drawLine(newPoint,lastPoint)
        lastPoint = newPoint;
      }
    }
  }
  canvas.onmouseup = () => {
    isAllowDrawLine = false;
  }
}


