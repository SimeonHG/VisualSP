class Entity {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }

    isInside(other) {
         return ((this.start.x >= other.start.x
                    && this.start.y >= other.start.y
                    && this.end.x <= other.end.x
                    && this.end.y <= other.end.y) ? true : false);
        }

    collides(other) {
        let wX = this.end.x - this.start.x;
        let wY = this.end.y - this.start.y;

        let owX = other.end.x - other.start.x;
        let owY = other.end.y - other.start.y;

        return (this.start.x + wX < other.start.x);
    }

    json() {
        let obj = new Object();
        let props = Reflect.ownKeys(this);

        for (const prop of props) {
            let value = Reflect.get(this, prop);

            if (Reflect.has(value, 'json')) {
                obj.e = value.json();
            } else {
                obj.e = value;
            }
        }

        return obj;
    }
}