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
let visualizeArrMerge = [];
let indxArrMerge = [];

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

function doSetTimeoutMerge(k, i){
    setTimeout(function(){
        changeElementsAmount(visualizeArrMerge[i]);
        for(let j=indxArrMerge[i][0]; j<=indxArrMerge[i][1]; j++){
            wrapper.childNodes[j].style.backgroundColor = 'red';
        }
    }, k*timeInterval);
}

function getChangedElements(arr1, arr2){
    let res = [];
    for(let i=0; i<arr1.length; i++){
        if(arr1[i]!=arr2[i]) res.push(i);
    }
    return res;
}

function mergeSort(arr, lIndex, rIndex){
    if(lIndex >= rIndex) return;

    let index = Math.floor(lIndex/2) + Math.floor(rIndex/2);

    mergeSort(arr, lIndex, index);
    mergeSort(arr, index+1, rIndex); 
    merge(arr, lIndex, index, rIndex);
}

function merge(arr, start, mid, end){
    let start2 = mid + 1;
    if(arr[mid] <= arr[start2]) return;

    let tempA = [start, end];
    indxArrMerge.push(tempA);

    while(start <= mid && start2 <= end){
        if(arr[start] <= arr[start2]){
            start++;
        }
        else {
            let value = arr[start2];
            let idx = start2;
            while(idx != start){
                arr[idx] = arr[idx-1];
                idx--;
            }
            arr[start] = value;
            start++;
            mid++;
            start2++;
        }
    }
    visualizeArrMerge.push([...arr]);
}

function quickSort(arr, start, end){
    if(start >= end) return;

    let pivot = quckSortPartition(arr, start, end);
    quickSort(arr, start, pivot-1);
    quickSort(arr, pivot+1, end);
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
    visualizeArrMerge = [];
    indxArrMerge = [];
    let k = 1;
    mergeSort(arr, 0, arr.length-1);
    for(let i=0; i<visualizeArrMerge.length; i++){
        doSetTimeoutMerge(k, i);
        k++;
    }
    setTimeout(function(){
        changeElementsAmount(arr);
    }, k*timeInterval);
}

function quickSortClicked(){
    console.log('quicksort works')
}