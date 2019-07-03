let parser = new JSONParser();

function exporter() {
    let element = document.createElement('a');
    let payload = JSON.stringify(parser.export(aisles));
    
    console.log(payload);
    
    element.setAttribute('download', "store_pick.json");
    element.setAttribute('href', 
        'data:text/plain;charset=utf-8,' + encodeURIComponent(payload));

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function beginCreateLabel() {
    if (selectedItems.length > 2) {
        alert("Please, only select one entity in order to label it!");
    } else {
        console.log(selectedItems);
        let itemToLabel = selectedItems[0];
        let input = createInput();

        input.position(itemToLabel.centerCoords()[0], itemToLabel.centerCoords()[1]);
        itemToLabel.setLabel;
    }
}

function createLabel() {

}

document.getElementById('importer').onchange = function(event) {
    console.log(event);
    
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
    
    function onReaderLoad(event){
        aisles = parser.import(event.target.result); 
    }
    
}