var generateBtn = document.getElementById("newArrayBtn");
var sortBtn = document.getElementById("sortBtn");
var cancelSort = document.getElementById("cancelSort");
var home = document.getElementById("homePage");
sortingArray = [];
colorVal = [];


cancelSort.onclick = function(){
    location.reload();
}

generateBtn.onclick = function(){
    newArray();
}

sortBtn.onclick = function(array){
    quickSort(sortingArray, 0, sortingArray.length -1);
}

function newArray(){
    removeElementsByClass("arrChildNew");
    sortingArray = [];
    colorVal = [];
    
    for(i=0; i<300; i++){
        sortingArray.push(getRandomInt(5, 150));
        colorVal.push(-1);
    }
    drawArray();
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function drawArray(){
    removeElementsByClass("arrChildNew");
    for(i in sortingArray){
        var y = document.createElement("div");
        y.className = "arrChildNew"
        var calcHeight = sortingArray[i] * 5 + "px";
        y.style.height = calcHeight;
        y.innerHTML = sortingArray[i];
        document.getElementById("arrChild").appendChild(y);
        if(colorVal[i] == 0){
            y.style.backgroundColor = "green";
        } else if(colorVal[i] == 1){
            y.style.backgroundColor = "red";
        } else if(colorVal[i] == 3){
            y.style.backgroundColor = "purple";
        }
    }
}

async function swap(array, leftIndex, rightIndex){
    var temp = array[leftIndex];

    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
    colorVal[leftIndex] = 0;
    colorVal[rightIndex] = 1;
    await sleep(10);
    drawArray();
}

async function partition(array, left, right) {
    var pivot   = array[Math.floor((right + left) / 2)], 
    i = left, 
    j = right; 
    while (i <= j) {
        while (array[i] < pivot) {
            i++;
        }
        while (array[j] > pivot) {
            j--;
        }
        if (i <= j) {
            await swap(array, i, j);
            colorVal[i] = -1;
            colorVal[j] = -1;

            i++;
            j--;
        }
    }
    return i;
}

async function quickSort(array, left, right) {
    var index;
    if (array.length > 1) {
        index = await partition(array, left, right); 
        if (left < index - 1) {
            await quickSort(array, left, index - 1);
        }
        if (index < right) {
            await quickSort(array, index, right);   
        }
    }
    for(i=0; i<=right; i++){
        colorVal[i] = 3;
    }
    drawArray();
    return array;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  