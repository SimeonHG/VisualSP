function exporter() {
    let element = document.createElement('a');
    let parser = new JSONParser();
    let payload = JSON.stringify(parser.export(aisles));
    
    element.setAttribute('download', "store_pick.json");
    element.setAttribute('href', 
        'data:text/plain;charset=utf-8,' + encodeURIComponent(payload));

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}