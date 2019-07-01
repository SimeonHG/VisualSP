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
            output[key].push({x: obj.x, y: obj.y});
        }

        let fp = fopen(this.filepath, 3);
        
        if (fp == -1) {
            throw "IOException, cannot open file";
        }

        fwrite(fp, JSON.stringify(output));
        fclose(fp);
    }
}