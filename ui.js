let parser = new JSONParser();
let inputBox, inputBoxButton, itemToLabel;

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
    if (selectedItems.length == 1) {
        if (inputBox) {
            inputBox.remove();
        }
        if (inputBoxButton) {
            inputBoxButton.remove();
        }
        console.log(selectedItems);
        itemToLabel = selectedItems[0];
        inputBox = createInput();
        inputBox.position(itemToLabel.centerCoords()[0], itemToLabel.centerCoords()[1]);
        inputBoxButton = createButton('Apply');
        inputBoxButton.position(inputBox.x + inputBox.width, itemToLabel.centerCoords()[1]);
        inputBoxButton.mousePressed(createLabel);

        Settings.setMode("movement");
    } else {
        alert("Please select exactly one entity!");
    } 
}

function createLabel() {
    itemToLabel.setLabel(inputBox.value());
    // console.log(inputBox.value());
    inputBox.remove();
    inputBoxButton.remove();
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