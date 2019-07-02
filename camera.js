class Camera {
    constructor(moveSpeed = 10) {
        this.moveSpeed = moveSpeed;
        this.zoom = 1;
        this.translation = [0, 0];
    }

    apply() {
        if (EventListener.getKeys().includes("W")) {
            this.translation[1] += this.moveSpeed;
        }
        if (EventListener.getKeys().includes("A")) {
            this.translation[0] += this.moveSpeed;
        }
        if (EventListener.getKeys().includes("S")) {
            this.translation[1] -= this.moveSpeed;
        }
        if (EventListener.getKeys().includes("D")) {
            this.translation[0] -= this.moveSpeed;
        }
        translate(this.translation[0], this.translation[1]);

    }
}
