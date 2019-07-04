
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

        return {
            mousePressed,
            mouseDragged,
            mouseReleased,
            keyboardMovement
        }
    }
    static zoom(controls) {
        function worldZoom(e){
            const {x, y, deltaY} = e;
            console.log("x: " + x);
            console.log("y: " + y);
            console.log("deltaY: " + deltaY);

            const direction = deltaY > 0 ? -1 : 1;
            const factor = 0.05;
            const zoom = 1*direction*factor;

            const wx = (mouseX-controls.view.x)/(width*mouseX-controls.view.zoom);
            const wy = (mouseY-controls.view.y)/(height*mouseY-controls.view.zoom);

            let prevX = controls.view.x;
            let prevY = controls.view.y;
            controls.view.x -= (mouseX - controls.view.x) * width * zoom / 1000;
            controls.view.y -= (mouseY - controls.view.y) * height * zoom / 1000;
            controls.view.zoom += zoom;
            
            // console.log("constrols.view.x: " + controls.view.x);

            if (controls.view.zoom >= 1.6 && deltaY < 0) {
                controls.view.zoom = 1.6;
                controls.view.x = prevX;
                controls.view.y = prevY;
            } else if (controls.view.zoom <= 0.2 && deltaY > 0) {
                controls.view.zoom = 0.2;
                controls.view.x = prevX;
                controls.view.y = prevY;
            }

        }
        return {worldZoom}
    }
}
