class Camera {
    constructor(moveSpeed = 10) {
        this.moveSpeed = moveSpeed;
        this.zoom = 1;
    }

    apply() {
        if (EventListener.getKeys().includes("W")) {
            translate(0, - millis() / 100 * this.moveSpeed);
        }
        if (EventListener.getKeys().includes("A")) {
            translate(0, -millis() / 100 * this.moveSpeed);
        }
        if (EventListener.getKeys().includes("S")) {
            translate(0, millis() / 100 * this.moveSpeed);
        }
        if (EventListener.getKeys().includes("D")) {
            translate(0, -millis() / 100 * this.moveSpeed);
        }
    }
}
