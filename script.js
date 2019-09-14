"use strict";

const TIME_DELAY = 20;
const INITIAL_SIZE_VALUE = 15;
const INITIAL_SPEED_VALUE = 50;

let wrapper = document.getElementById('wrapper');
let sizeInput = document.getElementById('sizeInput');
let speedInput = document.getElementById('speedInput');

let speedValue, sizeValue;

let timeInterval;
let arr;

//  gets values from inputs
function sizeChanged(value){
    let tempArr = [];
    for(let i=0; i<value; i++){
        let randomNum = Math.floor(Math.random()*200);
        tempArr.push(randomNum);
    }
    arr = tempArr;
    changeElementsAmount();
    console.log(arr);
}

function speedChanged(value){
    timeInterval = (100 - value) * TIME_DELAY;
    console.log(timeInterval);
}

function changeElementsAmount(){
    removeChildElements();
    for(let i=0; i<arr.length; i++){
        let elem = document.createElement('div');
//  Setting styles to columns
        elem.style.width = (100/(arr.length*2)).toString() + '%';
        elem.style.height = (arr[i]*2.5 + 17).toString() + 'px';
        elem.style.backgroundColor = 'black';
        elem.style.margin = '1px';
        elem.style.order = i.toString();
/////////////////////////////
        if(arr.length <= 15){
            elem.style.textAlign = 'center';
            let elemChild = document.createElement('p');
            elemChild.innerText = arr[i].toString();
            elemChild.style.color = 'white';
            elemChild.style.margin = '3px';
            elemChild.style.fontSize = (25-arr.length).toString() + 'px';
            elem.appendChild(elemChild);
        }

        wrapper.appendChild(elem);
    }
}

function removeChildElements(){
    while(wrapper.firstChild){
        wrapper.removeChild(wrapper.firstChild);
    }
}

function swapChildElements(a, b){
    if(a>=0 && b>=0 && a<wrapper.childNodes.length && b<wrapper.childNodes.length){
        wrapper.childNodes[a].style.order = b;
        wrapper.childNodes[b].style.order = a;
    }
}

sizeInput.value = INITIAL_SIZE_VALUE.toString();
speedInput.value = INITIAL_SPEED_VALUE.toString();
sizeChanged(INITIAL_SIZE_VALUE);
speedChanged(INITIAL_SPEED_VALUE);


function stopClicked() {
    console.log('stop');
}


function insertionSortClicked() {
    for (let i = 1, len = arr.length; i < len; i++) {
        let temp = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > temp) {
            arr[j + 1] = arr[j]
            j--;
        }
        arr[j + 1] = temp;
    }
    changeElementsAmount();
    console.log(arr);
}
