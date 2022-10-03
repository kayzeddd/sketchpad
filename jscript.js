const body = document.querySelector("body");
body.classList.add("bodyItems")
//container
const container= document.createElement("div");
container.classList.add("containerBorder")
body.appendChild(container);

//grid
function containerSize(columns,columnSize,rows,rowSize){
container.style.cssText = `
                           grid-template-columns: repeat(${columns}, ${columnSize}px);
                           grid-template-rows: repeat(${rows}, ${rowSize}px);`
createDivs(columns*rows)
}

//boxes 
function createDivs(n){
    const boxes =[];
    for (let i= 0; i < n; i++){
        boxes[i] = document.createElement("div");
        //boxes[i].classList.add("boxBorder");
    }
    boxes.forEach(box => box.addEventListener("mouseover", (e) => color(e)));
    appendDivs(boxes);
}

//hover
function color(e){
    let box = e.target;
    box.classList.add("bgColorChange"); 
    }

//
function appendDivs(array){
    for (let i =0; i < array.length; i++){
        container.appendChild(array[i]);
    }
}

//prompt button
const btnDiv = document.createElement("div");
btnDiv.classList.add("buttonDiv")
const askUserBtn = document.createElement("button");
askUserBtn.textContent = "Change Grid Size";
btnDiv.appendChild(askUserBtn) ;
body.insertBefore(btnDiv, container) ;

btnDiv.addEventListener('click', (e) => userPrompt());

function userPrompt() {
    let askUser = prompt("How many squares per side?", 50);
    if (askUser <= 100){
        containerSize(askUser, 10, askUser, 10);
    }
    else {
        alert("bro I will crash")
    }
}
