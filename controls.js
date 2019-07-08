
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
            if(!mouseIsInsideCanvas()) return;

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

        function keyboardMovement() {
            if (EventListener.getKeys().includes("W")) {
                controls.view.y += 10;
            }
            if (EventListener.getKeys().includes("A")) {
                controls.view.x += 10;
            }
            if (EventListener.getKeys().includes("S")) {
                controls.view.y -= 10;
            }
            if (EventListener.getKeys().includes("D")) {
                controls.view.x -= 10;
            }
            
        }
        function edgeRight(){
            controls.view.x += 20;
        }
        function edgeLeft(){
            controls.view.x -= 20;
        }
        function edgeTop(){
            controls.view.y -= 20;
        }
        function edgeBottom(){
            controls.view.y += 20;
        }

        return {
            mousePressed,
            mouseDragged,
            mouseReleased,
            keyboardMovement,
            edgeBottom,
            edgeLeft,
            edgeRight,
            edgeTop
        }
    }
    static zoom(controls) {
        function worldZoom(e){
            const {x, y, deltaY} = e;

            const direction = deltaY > 0 ? -1 : 1;
            const factor = 0.05;
            const zoom = 1*direction*factor;

            // let prevX = controls.view.x;
            // let prevY = controls.view.y;
            // controls.view.x -= (mouseX - controls.view.x) * width * zoom / 1000;
            // controls.view.y -= (mouseY - controls.view.y) * height * zoom / 1000;
            controls.view.zoom += zoom;
            
            if (controls.view.zoom >= 1.6 && deltaY < 0) {
                controls.view.zoom = 1.6;
                // controls.view.x = prevX;
                // controls.view.y = prevY;
            } else if (controls.view.zoom <= 0.2 && deltaY > 0) {
                controls.view.zoom = 0.2;
                // controls.view.x = prevX;
                // controls.view.y = prevY;
            }

        }
        return {worldZoom}
    }
}
