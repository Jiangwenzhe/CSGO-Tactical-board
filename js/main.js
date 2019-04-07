const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const brush = document.querySelector('#brush');
const eraser = document.querySelector('#eraser');
const clearCanvas = document.querySelector('#clear');
const mapSelector = document.querySelector('#mapSelector');
const downloadBtn = document.querySelector('#download');
const colorSelector = document.querySelector('.colorSelector > ul');
const lineSelector = document.querySelector('.lineSelector > ul');


let isAllowDrawLine = false;
let isAllowWipeLine = false;
let lineWidth = 4;
let lineColor = '#03FF00';

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
  make_canvas_background('../maps/de_dust2.jpg');
}

const mousePositionOnCanvas = (canvas, x, y) => {
  let rect = canvas.getBoundingClientRect();
  return {
    x: x - rect.left * (canvas.width/rect.width),
    y: y - rect.top * (canvas.height/rect.height)
  }
}

const make_canvas_background = url => {
  background_image = new Image();
  background_image.src = url;
  background_image.onload = () => ctx.drawImage(background_image, 0, 0);
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

colorSelector.addEventListener('click', e => {
  let arr = document.querySelectorAll('.colorSelector>ul>li');
  arr.forEach(element => element.className.indexOf('active') ?
  element.classList.remove('active') : null);
  lineColor = burshColor[e.target.classList[0]];
  e.target.classList.add('active');
});

lineSelector.addEventListener('click', e => {
  let arr = document.querySelectorAll('.lineSelector>ul>li');
  arr.forEach(element => element.className.indexOf('active') ?
  element.classList.remove('active') : null);
  lineWidth = linesWidth[e.target.classList[0]];
  e.target.classList.add('active');
  console.log(e.target.classList)
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
  var link = document.createElement('a');
  link.href = canvas.toDataURL("image/png", 1.0);
  link.download = 'CSGO-Tactical.png';
  link.target = '_blank';
  link.click();
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


