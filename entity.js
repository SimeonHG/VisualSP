class Entity {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.normalize();
        this.width = abs(this.start.x - this.end.x);
        this.height = abs(this.start.y - this.end.y);
    }

    normalize() {
        let o1 = this.end;
        let o2 = this.start;

        let new_start = {
            x: min(o1.x, o2.x),
            y: min(o1.y, o2.y)
        };
        let new_end = {
            x: max(o1.x, o2.x),
            y: max(o1.y, o2.y)
        };

        this.start = new_start;
        this.end = new_end;
    }

    isInside(other) {
        return ((this.start.x >= other.start.x
                    && this.start.y >= other.start.y
                    && this.end.x <= other.end.x
                    && this.end.y <= other.end.y) ? true : false);
    }

    collides(other) {
        if (this.start.x < other.start.x + other.width &&
            this.start.x + this.width > other.start.x &&
            this.start.y < other.start.y + other.height &&
            this.start.y + this.height > other.start.y) {
            return true;
        }

        return false;
    }

    invalid(others) {
        let result = {
            collided : false, 
            collisionObjects : []
        }

        for (let other of others) {
            if (this.collides(other) && this != other) {
                result.collisionObjects.push(other);
                result.collided = true;
            } else {
                result.collided = false;
            }
        }
        
        return result;
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