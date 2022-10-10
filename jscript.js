const body = document.querySelector("body");
//body.classList.add("bodyItems")
const btnDiv = document.querySelector(".btnDiv")

//Global Variables
let draw = false;
let startErase = false;
let erase = false;
let rainbow = false;

//prompt button
//const btnDiv = document.createElement("div");
//btnDiv.classList.add("buttonDiv")
//const askUserBtn = document.createElement("button");
//askUserBtn.textContent = "Change Grid Size";
//askUserBtn.classList.add("buttonStyle");
//btnDiv.appendChild(askUserBtn) ;
//body.appendChild(btnDiv) ;

const askUserBtn = document.querySelector(".buttonStyle")
askUserBtn.addEventListener('click', (e) => userPrompt());

function userPrompt() {
    let dimensions = prompt("How many squares per side? \n min:50 | max:120", 100);
    if (dimensions == null){return}
    if (document.contains(document.querySelector(".containerCss"))){
        body.removeChild(document.querySelector(".containerCss"));
        resetToBlack();
        }
    if (dimensions <= 120 && dimensions >= 50){ 
        containerSize(dimensions, 8, dimensions, 8);        
    }
    else {
        alert("10 or more and 100 or less")
    }
}


//container/grid
function containerSize(columns,columnSize,rows,rowSize){
container= document.createElement("div");
container.classList.add("containerCss");
container.classList.add("borderFrame")
container.addEventListener("mousedown", start);
container.addEventListener("mouseup", stop);
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
        boxes[i].addEventListener("mouseover", (e) => coloring(e))
        boxes[i].addEventListener("mouseover", (e) => erasing(e))
        boxes[i].addEventListener('dragstart', (e) => {e.preventDefault()})
        boxes[i].addEventListener('drop', (e) => {e.preventDefault()})             
        //boxes[i].classList.add("boxBorder");
    }
    return boxes;
}

//draw/erase only with 'mousedown'
function start() {
    if (startErase == true){
        erase = true;
    }
    else {draw = true;} 
}

function stop(){
    draw = false;
    erase = false;
}

//Eraser
//const eraserBtn = document.createElement("button");
//eraserBtn.textContent = "Eraser";
//eraserBtn.classList.add("buttonStyle")
//btnDiv.appendChild(eraserBtn);

const eraserBtn = document.querySelector(".eraserBtn")
eraserBtn.addEventListener('click', eraseOn);

let timesClicked = 0;

function eraseOn() {
    if (timesClicked > 0) {
        startErase = false;
        eraserBtn.textContent = "Eraser";
        timesClicked = 0;
    }
    else if (timesClicked == 0){
        startErase = true;
        eraserBtn.textContent = "Stop Erasing";
        timesClicked ++;
    }    
}

function erasing(e) {
    if (erase == true) {
        let box = e.target;
        box.style.cssText= "background-color: white;";
    }
}


//color picker drop down menu
const dropdownDiv = document.querySelector(".dropdownDiv");
btnDiv.insertBefore(dropdownDiv,eraserBtn);
const colorPicker = document.querySelector(".colorPicker");
const menu = document.querySelector("#dropdownMenu");
colorPicker.addEventListener("click", show)

function show() {
    menu.classList.toggle("show");
}

window.onclick = (e) => {
    if (e.target != colorPicker) {
        let dropdownMenu = document.querySelector(".diffColors");
        if (dropdownMenu.classList.contains("show")){
            dropdownMenu.classList.remove("show");
        }
    }
}

const colorBlack = document.querySelector(".colorBlack");
colorBlack.addEventListener("click", (e) => {color = "black"; rainbow =false});
const colorRed = document.querySelector(".colorRed");
colorRed.addEventListener("click", (e) => {color = "Red" ; rainbow =false}) ;
const colorGreen = document.querySelector(".colorGreen");
colorGreen.addEventListener("click", (e) => {color = "Green" ; rainbow =false});
const colorBlue = document.querySelector(".colorBlue");
colorBlue.addEventListener("click", (e) => {color = "Blue" ; rainbow =false});
const colorRainbow = document.querySelector(".colorRainbow");
colorRainbow.addEventListener("click", (e) => rainbow = true);
const colorRandom = document.querySelector(".colorRandom");
colorRandom.addEventListener("click", random);
const colorCustom = document.querySelector(".colorCustom");
colorCustom.addEventListener("click", customize)

function customize(){
    rainbow =false
    let colorPrompt = prompt("Enter Hex RGB Value (no space between)\nEx: #5F9EA0", '#')
    color = colorPrompt;
}

function random() {
    rainbow =false
    color = `rgb(${randomize()}, ${randomize()}, ${randomize()})`
    return color
}


//one color
let color="black";

function coloring(e){
    let box = e.target;
    if (draw == true){
        if (rainbow == true){
            rainbowColor(e)
        }
    else {box.style.cssText= `background-color: ${color}`; }
    }
}

//Different colors per box
function rainbowColor(e){
    //console.log(`background-color: rgb(${randomize()}, ${randomize()}, ${randomize()})`)
    if (draw == true){
        console.log(e.target)
    let box = e.target;
    box.style.cssText = `background-color: rgb(${randomize()}, ${randomize()}, ${randomize()})`;
    }
}

function randomize(){
    return Math.floor(Math.random()*256);
}

//Color turns to black after 'x' passes
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


//Grid on load
containerSize(100,8,100,8);