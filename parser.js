
class JSONParser extends BasicParser {
    export(object) {
        output = { aisles: [] };
        
        for (const iterator of object) {
            output.aisles.push(object.json());
        }
        return output;
    }


    import(string) {
        let object = JSON.parse(string);

        for (const aisle of object.aisle) {
            
        }
    }
}