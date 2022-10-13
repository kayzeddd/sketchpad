const body = document.querySelector("body");
const btnDiv = document.querySelector(".btnDiv")

//Global Variables
let draw = false;
let startErase = false;
let erase = false;
let rainbow = false;
let color="black";
let brushSize= 1;
let eraserSize= 1;

//prompt button
const askUserBtn = document.querySelector(".buttonStyle")
askUserBtn.addEventListener('click', (e) => userPrompt());

function userPrompt() {
    let dimensions = prompt("Enter Canvas Size \n min:50 | max:120", 100);
    if (dimensions == null){return}
    if (dimensions < 50 || dimensions > 120){
        alert("50 or more and 120 or less")
        return
    }
    if (document.contains(document.querySelector(".containerCss"))){
        body.removeChild(document.querySelector(".containerCss"));
        resetToBlack();
        }
    if (dimensions <= 120 && dimensions >= 50){ 
        containerSize(dimensions, 8, dimensions, 8);        
    }
}


//container/grid
function containerSize(columns,columnSize,rows,rowSize){
container= document.createElement("div");
container.classList.add("containerCss");
container.classList.add("borderFrame")
container.addEventListener("mousedown", start);
container.addEventListener("mouseup", stop);
//container.addEventListener("click", (e) => {console.log(`container:${e.clientX}, ${e.clientY}`)})
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
        boxes[i].addEventListener("mouseover", (e) => useSizeColor(e))
        boxes[i].addEventListener("mouseover", (e) => useSizeEraser(e))
        boxes[i].addEventListener('dragstart', (e) => {e.preventDefault()})
        boxes[i].addEventListener('drop', (e) => {e.preventDefault()})             
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
const eraserBtn = document.querySelector(".eraserBtn")
eraserBtn.addEventListener('click', eraseOn);

function eraseOn() {
    startErase = true;
    eraserBtn.classList.add("eraserOn");
    colorPicker.classList.remove("coloringOn")
}

function erasing(e) {
    if (erase == true) {
        let box = e.target;
        box.style.cssText= "background-color: white;";
    }
}

//Eraser drop down menu
const eraserMenu = document.querySelector(".eraserMenu");
eraserBtn.addEventListener("click", eraserShow);

function eraserShow() {
    eraserMenu.classList.toggle("show");
}

//color picker / size picker / eraser picker drop down menu
const colorPicker = document.querySelector(".colorPicker");
const sizePicker = document.querySelector(".diffSizes");
const menu = document.querySelector(".dropdownMenu1");
const menu2 = document.querySelector(".dropdownMenu2");

colorPicker.addEventListener("click", show);

function show() {
    startErase = false;
    timesClicked = 0;
    colorPicker.classList.add("coloringOn");
    eraserBtn.classList.remove("eraserOn");
    menu.classList.toggle("show");
    menu2.classList.toggle("show");
}

//close menus if 'click' is not on colorPicker or eraserBtn
window.onclick = (e) => {
    if (e.target != colorPicker && e.target != eraserBtn) {
        if (menu.classList.contains("show") || menu2.classList.contains("show") || eraserMenu.classList.contains("show")){
            menu.classList.remove("show");
            menu2.classList.remove("show");
            eraserMenu.classList.remove("show");
        }
    }
}

//color picker buttons
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

//brush size picker
const brush1 = document.querySelector(".brush1");
brush1.addEventListener("click", size);
const brush2 = document.querySelector(".brush2");
brush2.addEventListener("click", size);
const brush3 = document.querySelector(".brush3");
brush3.addEventListener("click", size);

function size(e) {
    if (e.target.classList == "brush1"){
        brushSize = 1;
    }
    if (e.target.classList == "brush2"){
        brushSize = 2;
    }
    if (e.target.classList == "brush3"){
        brushSize = 3;
    }
}

//color/size function
function useSizeColor(e){
    if (brushSize == 1){coloring(e)};
    if(brushSize == 2){coloring2(e)};
    if (brushSize == 3){coloring3(e)};
}

//coloring div size 1;
function coloring(e){
    let box = e.target;
    if (draw == true){
        if (rainbow == true){
            rainbowColor(e)
        }
    else {box.style.cssText= `background-color: ${color}`; }
    }
}

//coloring div size 2;
function coloring2(e) {
    if (draw == true) {
    let x = e.clientX - 8;
    let y = e.clientY - 8;
    for (let i = 0; i < 3; i += 1) {
        if (i == 0){
            for (let z = 0; z < 3; z++){
            let box = document.elementFromPoint(x + (8 * z),y);
            box.style.cssText = `background-color: ${color}`;
        }  
        }
        if (i == 1){
            for (let z = 0; z < 3; z++){
            let box = document.elementFromPoint(x + (8 * z),y + 8);
            box.style.cssText = `background-color: ${color}`;
        }  
        }
        if (i == 2){
            for (let z = 0; z < 3; z++){
            let box = document.elementFromPoint(x + (8 * z),y + 16);
            box.style.cssText = `background-color: ${color}`;
        }  
        }
    }
}
}

//coloring div size 3;
function coloring3(e) {
    if (draw == true) {
    let x = e.clientX - 16;
    let y = e.clientY - 16;
    for (let i = 0; i < 5; i += 1) {
        if (i == 0){
            for (let z = 0; z < 5; z++){
            let box = document.elementFromPoint(x + (8 * z),y);
            box.style.cssText = `background-color: ${color}`;
        }  
        }
        if (i == 1){
            for (let z = 0; z < 5; z++){
            let box = document.elementFromPoint(x + (8 * z),y + 8);
            box.style.cssText = `background-color: ${color}`;
        }  
        }
        if (i == 2){
            for (let z = 0; z < 5; z++){
            let box = document.elementFromPoint(x + (8 * z),y + 16);
            box.style.cssText = `background-color: ${color}`;
        }  
        }
        if (i == 3){
            for (let z = 0; z < 5; z++){
            let box = document.elementFromPoint(x + (8 * z),y + 24);
            box.style.cssText = `background-color: ${color}`;
        }  
        }
        if (i == 4){
            for (let z = 0; z < 5; z++){
            let box = document.elementFromPoint(x + (8 * z),y + 32);
            box.style.cssText = `background-color: ${color}`;
        }  
        }
    }
}
}

//eraser size picker
const eraser1 = document.querySelector(".eraser1");
eraser1.addEventListener("click", sizeEraser);
const eraser2 = document.querySelector(".eraser2");
eraser2.addEventListener("click", sizeEraser);
const eraser3 = document.querySelector(".eraser3");
eraser3.addEventListener("click", sizeEraser);

function sizeEraser(e) {
    if (e.target.classList == "eraser1"){
        eraserSize = 1;
    }
    if (e.target.classList == "eraser2"){
        eraserSize = 2;
    }
    if (e.target.classList == "eraser3"){
        eraserSize = 3;
    }
}

//color/size function
function useSizeEraser(e){
    if (eraserSize == 1){erasing(e)};
    if(eraserSize == 2){erasing2(e)};
    if (eraserSize == 3){erasing3(e)};
}

//eraser size 1
function erasing(e){
    let box = e.target;
    if (erase == true){
    {box.style.cssText= `background-color: white`; }
    }
}

//eraser size 2;
function erasing2(e) {
    if (erase == true) {
    let x = e.clientX - 8;
    let y = e.clientY - 8;
    for (let i = 0; i < 3; i += 1) {
        if (i == 0){
            for (let z = 0; z < 3; z++){
            let box = document.elementFromPoint(x + (8 * z),y);
            box.style.cssText = `background-color: white`;
        }  
        }
        if (i == 1){
            for (let z = 0; z < 3; z++){
            let box = document.elementFromPoint(x + (8 * z),y + 8);
            box.style.cssText = `background-color: white`;
        }  
        }
        if (i == 2){
            for (let z = 0; z < 3; z++){
            let box = document.elementFromPoint(x + (8 * z),y + 16);
            box.style.cssText = `background-color: white`;
        }  
        }
    }
}
}

//eraser size 3;
function erasing3(e) {
    if (erase == true) {
    let x = e.clientX - 16;
    let y = e.clientY - 16;
    for (let i = 0; i < 5; i += 1) {
        if (i == 0){
            for (let z = 0; z < 5; z++){
            let box = document.elementFromPoint(x + (8 * z),y);
            box.style.cssText = `background-color: white`;
        }  
        }
        if (i == 1){
            for (let z = 0; z < 5; z++){
            let box = document.elementFromPoint(x + (8 * z),y + 8);
            box.style.cssText = `background-color: white`;
        }  
        }
        if (i == 2){
            for (let z = 0; z < 5; z++){
            let box = document.elementFromPoint(x + (8 * z),y + 16);
            box.style.cssText = `background-color: white`;
        }  
        }
        if (i == 3){
            for (let z = 0; z < 5; z++){
            let box = document.elementFromPoint(x + (8 * z),y + 24);
            box.style.cssText = `background-color: white`;
        }  
        }
        if (i == 4){
            for (let z = 0; z < 5; z++){
            let box = document.elementFromPoint(x + (8 * z),y + 32);
            box.style.cssText = `background-color: white`;
        }  
        }
    }
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