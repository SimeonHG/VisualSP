
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
        let map = new Array();
        let temp_aisle, segments;

        for (const aisle of object.aisles) {
            temp_aisle = new Aisle(aisle.start, aisle.end)
            segments = aisle.segments.map((e) => new Segment(e.start, e.end).attach(temp_aisle)); 
            temp_aisle.segments = segments;

            map.push(temp_aisle);
        }
        
        return map;
    }
}