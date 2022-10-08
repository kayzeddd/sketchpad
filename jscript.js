const body = document.querySelector("body");
body.classList.add("bodyItems")

let draw = false;
containerSize(80,10,80,10);

//prompt button
const btnDiv = document.createElement("div");
btnDiv.classList.add("buttonDiv")
const askUserBtn = document.createElement("button");
askUserBtn.textContent = "Change Grid Size";
btnDiv.appendChild(askUserBtn) ;
body.insertBefore(btnDiv, container) ;

btnDiv.addEventListener('click', (e) => userPrompt());

function userPrompt() {
    let dimensions = prompt("How many squares per side? \n min:10 | max:100", 80);
    if (dimensions == null){return}
    if (document.contains(document.querySelector(".containerCss"))){
        body.removeChild(document.querySelector(".containerCss"));
        resetToBlack();
        }
    if (dimensions <= 100 && dimensions >= 10){ 
        containerSize(dimensions, 10, dimensions, 10);        
    }
    else {
        alert("10 or more and 100 or less")
    }
}


//container/grid
function containerSize(columns,columnSize,rows,rowSize){
container= document.createElement("div");
container.classList.add("containerCss");
container.addEventListener("mousedown", startDraw);
container.addEventListener("mouseup", stopDraw);
body.appendChild(container);
container.style.cssText = `grid-template-columns: repeat(${columns}, ${columnSize}px);
                           grid-template-rows: repeat(${rows}, ${rowSize}px);`                        
let boxes = createDivs(columns*rows)
for (let i =0; i < boxes.length; i++){
    container.appendChild(boxes[i]);
}
}

//boxes 

function createDivs(n){
    const boxes =[]; 
    for (let i= 0; i < n; i++){
        boxes[i] = document.createElement("div")
        boxes[i].addEventListener("mouseover", (e) => randomColor(e))
        boxes[i].addEventListener('dragstart', (e) => {e.preventDefault()})
        boxes[i].addEventListener('drop', (e) => {e.preventDefault()})             
        //boxes[i].classList.add("boxBorder");
    }
    return boxes;
}

function startDraw() {
    draw = true;
}

function stopDraw(){
    draw = false;
}

function coloring(){
    if (draw == true){
    let box = this;
    box.classList.add("bgColorChange"); 
    }
}

//Same color per box
function color(e){
    let box = e.target;
    box.classList.add("bgColorChange"); 
    }

//Different color per box
function randomColor(e){
    //console.log(`background-color: rgb(${randomize()}, ${randomize()}, ${randomize()})`)
    if (draw == true){
    let box = e.target;
    box.style.cssText = `background-color: rgb(${randomize()}, ${randomize()}, ${randomize()})`;
    }
}

function randomize(){
    return Math.floor(Math.random()*256);
}

//Turn to black after 'x' passes
let x = 1000;
let pass= 0;
let r = randomize();
let tenPercentR= (r/x);
let g = randomize();
let tenPercentG= (g/x);
let b = randomize();
let tenPercentB= (b/x);
let initialColor = `background-color: rgb(${r}, ${g}, ${b})`;

function toBlack(e){
    let box = e.target;
    box.style.cssText = initialColor;
    console.log(initialColor);
    if (pass < x){
    r = r - tenPercentR;
    g = g - tenPercentG;
    b = b - tenPercentB
    initialColor = `background-color: rgb(${r}, ${g}, ${b})`;
    pass +=1;
    }
}

function resetToBlack(){
    pass= 0;
    r = randomize();
    tenPercentR= (r/x);
    g = randomize();
    tenPercentG= (g/x);
    b = randomize();
    tenPercentB= (b/x);
    initialColor = `background-color: rgb(${r}, ${g}, ${b})`;
}