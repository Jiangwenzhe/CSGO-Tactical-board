
/*
 获取鼠标按在画布上的位置
*/
const windowPosition = (canvas, x, y) => {
  let rect = canvas.getBoundingClientRect();
  return {
    x: x - rect.left * (canvas.width/rect.width),
    y: y - rect.top * (canvas.height/rect.height)
  }
}

export {
  windowPosition
}