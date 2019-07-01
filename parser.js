class BasicParser {
    constructor(filepath) {
        this.filepath = filepath;
    }
    export(obj) {}
    import() {}
}

class JSONParser extends BasicParser {
    constructor(filepath) {
        super(filepath);
    }

    export(obj) {
        output = {aisles: [], shelfs: []};
        
        for (let i = 0; i < obj.length; i++) {
            let key = obj.constructor.name.toLowerCase();
            {}
            output[key].push({x: obj.x, y: obj.y});
        }

        return output;
    }

    import() {
        let fp = fopen(this.filepath);

        fread()
    }
}