class Corner {
    constructor(x, y, size = 20) {
        this.pos = {
            x: x,
            y: y
        }
        this.size = size;
        this.active = false;
    }

    setpos(coords) {
        this.pos.x = coords.x;
        this.pos.y = coords.y;
    }

    draw() {
        if (!this.active) {
            return;
        }
        circle(this.pos.x, this.pos.y, this.size);
    }

    isClicked() {
        if (!this.active) {
            return;
        }

        let mouseVec = createVector(mouseX, mouseY);
        mouseVec.sub(createVector(this.pos.x, this.pos.y));
        let coords = Grid.normalize(mouseVec);

        let nX = coords.x;
        let nY = coords.y;

        let dist = sqrt(nX*nX + nY*nY);
 
        return dist <= this.size;
    }

    activate() {
        this.active = true;
    }

    deactivate() {
        this.active = false;
    }
}