
class Controls {
    static move(controls) {
        function mousePressed() {
          controls.viewPos.isDragging = true;
          controls.viewPos.prevX = mouseX;
          controls.viewPos.prevY = mouseY;
        }

        function mouseDragged() {
          const {prevX, prevY, isDragging} = controls.viewPos;
          if(!isDragging) return;

          const pos = {x: mouseX, y: mouseY};
          const dx = pos.x - prevX;
          const dy = pos.y - prevY;

          if(prevX || prevY) {
            controls.view.x += dx;
            controls.view.y += dy;
            controls.viewPos.prevX = pos.x, controls.viewPos.prevY = pos.y
          }
        }

        function mouseReleased() {
          controls.viewPos.isDragging = false;
          controls.viewPos.prevX = null;
          controls.viewPos.prevY = null;
        }
     
        return {
          mousePressed, 
          mouseDragged, 
          mouseReleased
        }
      }
    static zoom(controls) {
        function worldZoom(e){
            const {x, y, deltaY} = e;
            const direction = deltaY > 0 ? -1 : 1;
            const factor = 0.05;
            const zoom = 1*direction*factor;
            console.log("zoom = " + zoom);

            const wx = (mouseX-controls.view.x)/(width*mouseX-controls.view.zoom);
            //console.log("wx = " + wx);
            const wy = (mouseY-controls.view.y)/(height*mouseY-controls.view.zoom);
            //console.log("wy = " + wy);

            controls.view.x -= (mouseX-controls.view.x)*width*zoom/1000;
            controls.view.y -= (mouseY-controls.view.y)*height*zoom/1000;
            controls.view.zoom += zoom;
            console.log("controls.view.x = " + controls.view.x);
            console.log("controls.view.y = " + controls.view.y);
            console.log("controls.view.zoom = " + controls.view.zoom);
        }
        return{worldZoom}
    }
}