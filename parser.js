
class JSONParser {
    static export_filter(k, v) {
        if (v.invalid)
            return undefined;

        return k[0] === '_' ? undefined : v;
    }


    import(string) {
        let object = JSON.parse(string);
        let map = new Array();
        let temp_aisle, segments;

        for (const aisle of object.aisles) {
            temp_aisle = new Aisle(aisle.start, aisle.end);
            segments = aisle.segments.map((e) => new Segment(e.start, e.end)); 
            temp_aisle.segments = segments;

            map.push(temp_aisle);
        }
        
        return map;
    }
}