
class JSONParser {
    export(objects) {
        let output = { aisles: [] };
        
        for (const aisle of objects) {
            output.aisles.push(aisle.json());
        }
        return output;
    }


    import(string) {
        let object = JSON.parse(string);

        for (const aisle of object.aisle) {
            
        }
    }
}