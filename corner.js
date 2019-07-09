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

        let mousePos = Grid.normalize(createVector(mouseX, mouseY));
        let mouseVec = createVector(mousePos.x, mousePos.y);
        mouseVec.sub(createVector(this.pos.x, this.pos.y));

        let mX = mouseVec.x;
        let mY = mouseVec.y;

        let dist = sqrt(mX*mX + mY*mY);

        return dist <= this.size;
    }

    activate() {
        this.active = true;
    }

    deactivate() {
        this.active = false;
    }
}
