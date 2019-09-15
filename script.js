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
    timeInterval = (21 - value) * TIME_DELAY;
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
        elem.style.height = (ar[i]*2.5 + 22).toString() + 'px';
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

sizeInput.value = INITIAL_SIZE_VALUE.toString();
speedInput.value = INITIAL_SPEED_VALUE.toString();
sizeChanged(INITIAL_SIZE_VALUE);
speedChanged(INITIAL_SPEED_VALUE);


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
    setTimeout(function(){
        changeElementsAmount(arr);
    }, (k+1)*timeInterval);
}

function doSetTimeout(k, [...ar]){
    setTimeout(function(){
        let swappedElems = getChangedElements(prevArr, ar);
        console.log(swappedElems);
        prevArr = ar;
        changeElementsAmount(ar);
        wrapper.childNodes[swappedElems[0]].style.backgroundColor = 'red';
    }, k*timeInterval);

}



function getChangedElements(arr1, arr2){
    let res = [];
    for(let i=0; i<arr1.length; i++){
        if(arr1[i]!=arr2[i]) res.push(i);
    }
    return res;
}
