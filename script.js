"use strict";

const TIME_DELAY = 6;
const INITIAL_SIZE_VALUE = 15;
const INITIAL_SPEED_VALUE = 10;

let wrapper = document.getElementById('wrapper');
let sizeInput = document.getElementById('sizeInput');
let speedInput = document.getElementById('speedInput');

let speedValue, sizeValue;

let timeInterval;
let arr;
let prevArr;
let arrMerge;
let visualizeArrMerge = [];

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
    for(let i=0; i<ar.length; i++){
        let elem = document.createElement('div');
//  Setting styles to columns
        elem.style.width = (100/(ar.length*2)).toString() + '%';
        elem.style.height = (ar[i]*2.5 + 25).toString() + 'px';
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

function swapChildElems(a, b){
    wrapper.childNodes[a].style.order = b;
    wrapper.childNodes[b].style.order = a;
}

function findChildElems(){}


sizeInput.value = INITIAL_SIZE_VALUE.toString();
speedInput.value = INITIAL_SPEED_VALUE.toString();
sizeChanged(INITIAL_SIZE_VALUE);
speedChanged(INITIAL_SPEED_VALUE);

function doSetTimeoutInsertion(k, [...ar]){
    setTimeout(function(){
        let swappedElems = getChangedElements(prevArr, ar);
        prevArr = ar;
        changeElementsAmount(ar);
        wrapper.childNodes[swappedElems[0]].style.backgroundColor = 'red';
    }, k*timeInterval);
}

function doSetTimeoutSelection(k, [...ar], j , i, index){
    setTimeout(function(){
        changeElementsAmount(ar);
        wrapper.childNodes[i].style.backgroundColor = 'red';
        wrapper.childNodes[j].style.backgroundColor = 'orange';
        wrapper.childNodes[index].style.backgroundColor = 'blue';
    }, k*timeInterval);
}

function doSetTimeoutMerge([...ar]){
    setTimeout(function(){
        changeElementsAmount(ar);
    }, 10);
}

function getChangedElements(arr1, arr2){
    let res = [];
    for(let i=0; i<arr1.length; i++){
        if(arr1[i]!=arr2[i]) res.push(i);
    }
    return res;
}

function mergeSort(ar){
    if(ar.length <= 1) return ar;

    let index = Math.floor(ar.length/2);
    
    let leftArr = ar.slice(0, index);
    let rightArr = ar.slice(index);

    return merge(mergeSort(leftArr), mergeSort(rightArr)); 
}

function merge(arr1, arr2){
    let res = [];
    let i = 0, j = 0;

    while(i<arr1.length && j<arr2.length){
        if(arr1[i] < arr2[j]){
            res.push(arr1[i]);
            i++;
        } else{
            res.push(arr2[j]);
            j++;
        }
    }

    while(i<arr1.length){
        res.push(arr1[i]);
        i++;
    }

    while(j<arr2.length){
        res.push(arr2[j]);
        j++;
    }
    visualizeArrMerge.push(res);
    doSetTimeoutMerge(res);
    // console.log(drawRes);
    return res;
}

// SORT FUNCTIONS
// ########################
function selectionSortClicked(){
    let k = 1;
    for(let i=0; i<arr.length; i++){
        let min = arr[i];
        let index = i;
        for(let j=i+1; j<arr.length; j++){
            doSetTimeoutSelection(k, arr, j, i, index);
            if(min>arr[j]) {
                min = arr[j];
                index = j;
            }
            k++;
        }
        if(min < arr[i]){
            let temp = arr[i];
            arr[i] = min;
            arr[index] = temp;
        }
    }
    setTimeout(function(){
        changeElementsAmount(arr);
    }, k*timeInterval);
    console.log(arr);
}

function insertionSortClicked(){
    let k = 1;
    for (let i = 1, len = arr.length; i < len; i++) {
        let temp = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > temp) {
            let t = arr[j+1];
            arr[j + 1] = arr[j]
            arr[j] = t;
            j--;
            doSetTimeoutInsertion(k, arr);
            k++;
        }
        arr[j + 1] = temp;
    }
    setTimeout(function(){
        changeElementsAmount(arr);
    }, k*timeInterval);
}

function mergeSortClicked(){
    arrMerge = [...arr];
    arr = mergeSort(arr);
    console.log(visualizeArrMerge);
    changeElementsAmount(arr);
}