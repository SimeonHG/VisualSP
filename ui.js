let parser = new JSONParser();
let inputBox, inputBoxButton, itemToLabel;

function exporter() {
    let element = document.createElement('a');
    let payload = JSON.stringify(Aisle.aisles, JSONParser.export_filter);
    
    console.log(payload);
    
    element.setAttribute('download', "store_pick.json");
    element.setAttribute('href', 
        'data:text/plain;charset=utf-8,' + encodeURIComponent(payload));

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function createLabel() {
    if (selectedItems.length == 1) {
        let inputBox = document.getElementById("labelName");
        itemToLabel = selectedItems[0];
        itemToLabel.setLabel(inputBox.value);
    } else {
        alert("Please select exaclt yone entity!");
    }
}

document.getElementById('importer').onchange = function(event) {
    console.log(event);
    
    let reader = new FileReader();
    reader.onload = onReaderLoad;
    reader.readAsText(event.target.files[0]);
    
    function onReaderLoad(event){
        Aisle.aisles = parser.import(event.target.result); 
    }
    
}