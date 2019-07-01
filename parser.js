class BasicParser {
    constructor(filename) {
        this.filename = filename
    }
    export(obj);
    import();
}

class JSONParser extends BasicParser {
    constructor(filename) {
        super(filename);
    }

    export(obj) {
        output = {aisles: [], shelfs: []}
        for (let i = 0; i < obj.length; i++) {
            const element = array[i];
            output
        }
    }
}