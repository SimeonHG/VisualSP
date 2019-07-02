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
        output = { 'aisles': [] };
        
        for (let i = 0; i < obj.length; i++) {
            output['aisle'].push(obj.json());
        }

        return output;
    }

    import() {
        let fp = fopen(this.filepath);

        fread()
    }
}