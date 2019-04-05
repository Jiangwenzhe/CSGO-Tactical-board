const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let isAllowDrawLine = false;
let isAllowWipeLine = false;

const mousePositionOnCanvas = (canvas, x, y) => {
  let rect = canvas.getBoundingClientRect();
  return {
    x: x - rect.left * (canvas.width/rect.width),
    y: y - rect.top * (canvas.height/rect.height)
  }
}

canvas.onmousedown = e => {
  isAllowDrawLine = true
  //获得鼠标按下的点相对canvas的坐标。
  let mousePosition = mousePositionOnCanvas(canvas, e.clientX, e.clientY);
  let { x, y } = mousePosition;
  ctx.moveTo(x, y);
  canvas.onmousemove = (e) => {
    if (isAllowDrawLine) {
        let mousePosition = mousePositionOnCanvas(canvas, e.clientX, e.clientY)
        let { x, y } = mousePosition;
        ctx.fillStyle = 'blue';
        ctx.strokeStyle = 'blue';
        ctx.lineTo(x, y);
        ctx.stroke();
    }
  }
  canvas.onmouseup = function() {
    isAllowDrawLine = false
  }
}


