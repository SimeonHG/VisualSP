class Entity {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.normalize();
        this.width = abs(this.start.x - this.end.x);
        this.height = abs(this.start.y - this.end.y);
        this.label = new Label(((this.end.x - this.start.x) / 2) + this.start.x,
            ((this.end.y - this.start.y) / 2) + this.start.y, Entity.calcLabelSizeFactor(this.width, this.height, "aaaaaaaaaaaaaaaaaaa"), Entity.mustRotate(this.width, this.height), "aaaaaaaaaaaaaaaaaaa" );
    }

    static calcLabelSizeFactor(width, height, text) {
        let shortestDimension = min(width, height);
        let longestDimension = max(width, height);
        return min(longestDimension / text.length, shortestDimension);
    }

    static mustRotate(width, height){
        return height > width;
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
        for (let other of others) {
            if (this.collides(other) && this != other) {
                return true;
            }
        }
        return false;
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