class Camera {
    moveSpeed = 10;
    zoom = 1;
    position = [0, 0]

    constructor(moveSpeed) {
        this.moveSpeed = moveSpeed
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