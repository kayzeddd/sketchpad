const body = document.querySelector("body");

//container
const container= document.createElement("div");
body.appendChild(container);

//grid
function containerSize(columns,columnSize,rows,rowSize){
container.style.cssText = `display:grid; 
                           grid-template-columns: repeat(${columns}, ${columnSize}px);
                           grid-template-rows: repeat(${rows}, ${rowSize}px);`
createDivs(columns*rows)
}

//boxes 
function createDivs(n){
    const boxes =[];
    for (let i= 0; i < n; i++){
        boxes[i] = document.createElement("div");
    }
    appendDivs(boxes);
}

function appendDivs(array){
    for (let i =0; i < array.length; i++){
        array[i].classList.add("boxBorder");
        container.appendChild(array[i]);
    }
}

//
containerSize(20,50,20,50)