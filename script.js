"use strict";

const TIME_DELAY = 20;
const INITIAL_SIZE_VALUE = 15;
const INITIAL_SPEED_VALUE = 10;

let wrapper = document.getElementById('wrapper');
let sizeInput = document.getElementById('sizeInput');
let speedInput = document.getElementById('speedInput');

let speedValue, sizeValue;

let timeInterval;
let arr;
let prevArr;

//  gets values from inputs
function sizeChanged(value){
    let tempArr = [];
    for(let i=0; i<value; i++){
        let randomNum = Math.floor(Math.random()*200);
        tempArr.push(randomNum);
    }
    arr = tempArr;
    prevArr = [...arr];
    changeElementsAmount(arr);
    console.log(arr);
}

function speedChanged(value){
    timeInterval = (20 - value) * TIME_DELAY;
    console.log(timeInterval);
}

function generateClicked(){
    sizeChanged(arr.length);
}

function changeElementsAmount(ar){
    removeChildElements();
    for(let i=0; i<arr.length; i++){
        let elem = document.createElement('div');
//  Setting styles to columns
        elem.style.width = (100/(ar.length*2)).toString() + '%';
        elem.style.height = (ar[i]*2.5 + 17).toString() + 'px';
        elem.style.backgroundColor = 'black';
        elem.style.margin = '1px';
        elem.style.order = i.toString();
/////////////////////////////
        if(arr.length <= 15){
            elem.style.textAlign = 'center';
            let elemChild = document.createElement('p');
            elemChild.innerText = ar[i].toString();
            elemChild.style.color = 'white';
            elemChild.style.margin = '3px';
            elemChild.style.fontSize = (25-ar.length).toString() + 'px';
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
    wrapper.childNodes[a].style.order = b;
    wrapper.childNodes[b].style.order = a;
}


sizeInput.value = INITIAL_SIZE_VALUE.toString();
speedInput.value = INITIAL_SPEED_VALUE.toString();
sizeChanged(INITIAL_SIZE_VALUE);
speedChanged(INITIAL_SPEED_VALUE);


function stopClicked() {
    console.log('stop');
}


function insertionSortClicked() {
    let k = 1;
    for (let i = 1, len = arr.length; i < len; i++) {
        let temp = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > temp) {
            let t = arr[j+1];
            arr[j + 1] = arr[j]
            arr[j] = t;
            j--;
            doSetTimeout(k, arr);
            k++;
        }
        arr[j + 1] = temp;
    }
}


function doSetTimeout(k, [...ar], a, b){
    setTimeout(function(){
        console.log(prevArr);
        console.log(ar);
        changeElementsAmount(ar);
    }, k*timeInterval);
}
