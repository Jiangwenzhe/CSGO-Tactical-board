const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const brush = document.querySelector('#brush');
const eraser = document.querySelector('#eraser');
const mapSelector = document.querySelector('#mapSelector');
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


const init = () => {
  canvas.style.backgroundImage = `url('../maps/de_dust2.jpg')`
}

const mousePositionOnCanvas = (canvas, x, y) => {
  let rect = canvas.getBoundingClientRect();
  return {
    x: x - rect.left * (canvas.width/rect.width),
    y: y - rect.top * (canvas.height/rect.height)
  }
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

colorSelector.addEventListener('click', e => {
  let arr = document.querySelectorAll('.colorSelector>ul>li');
  arr.forEach(element => element.className.indexOf('active') ?
  element.classList.remove('active') : null);
  lineColor = burshColor[e.target.classList[0]];
  e.target.classList.add('active');
});

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

mapSelector.addEventListener('change', (e) => {
  //清空画布
  ctx.clearRect(0, 0, canvas.width,canvas.height);
  let map = e.target.value;
  canvas.style.backgroundImage = `url('../maps/de_${map}.jpg')`
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
  canvas.onmouseup = function() {
    isAllowDrawLine = false
  }
}


