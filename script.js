"use strict";

const TIME_DELAY = 5;
const INITIAL_SIZE_VALUE = 15;
const INITIAL_SPEED_VALUE = 10;

//  Main Colors
const ELEM_BACKGROUND_COLOR = 'black';
const ELEM_TEXT_COLOR = 'white';
// Selection Colors
const SELECTION_COLOR_1 = 'blue';
const SELECTION_COLOR_2 = 'red';
const SELECTION_COLOR_3 = 'green';
// Insertion Colors
const INSERTION_COLOR = 'red';
// Bubble Colors
const BUBBLE_COLOR = 'red';
// Merge Colors
const MERGE_COLOR = 'red';
// Quick Colors
const QUICK_COLOR_1 = 'red';
const QUICK_COLOR_2 = 'green';

var audioCtx = new AudioContext();
var oscillator1 = audioCtx.createOscillator();
var oscillator2 = audioCtx.createOscillator();

var oscillator1On = false;
var oscillator2On = false;

let wrapper = document.getElementById('wrapper');

let generateArrayButton = document.getElementById('generateArray');
let stopSortingButton = document.getElementById('stopSorting');

let sizeInput = document.getElementById('sizeInput');
let speedInput = document.getElementById('speedInput');

let bogoSortButton = document.getElementById('bogoSort');
let selectionSortButton = document.getElementById('selectionSort');
let insertionSortButton = document.getElementById('insertionSort');
let bubbleSortButton = document.getElementById('bubbleSort');
let mergeSortButton = document.getElementById('mergeSort');
let quickSortButton = document.getElementById('quickSort');

let icon = document.getElementById('materialIcon');

let soundOn = true;
let isSorting = false;
let speedValue, sizeValue;

let timeInterval;
let arr;
let shownArr;
let sortedArr = [];
let prevArr;
let visualizeArrMerge = [];
let indxArrMerge = [];
let quickK;

stopSortingButton.style.pointerEvents = 'none';

//     oscillator.type = 'square';
//     oscillator.frequency.value = 500; 
//     oscillator.connect(audioCtx.destination);
//     oscillator.start();

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
}

function speedChanged(value){
    timeInterval = (21 - value) * TIME_DELAY;
    console.log(timeInterval);
}

function generateClicked(){
    sizeChanged(arr.length);   
}

function changeElementsAmount(ar){
    shownArr = [...ar];
    removeChildElements();
    for(let i=0; i<ar.length; i++){
        let elem = document.createElement('div');
//  Setting styles to columns
        elem.style.width = (100/(ar.length*2)).toString() + '%';
        elem.style.height = (ar[i]*2.5 + 25).toString() + 'px';
        elem.style.backgroundColor = ELEM_BACKGROUND_COLOR;
        elem.style.margin = '1px';
        elem.style.order = i.toString();
/////////////////////////////
        if(arr.length <= 15){
            elem.style.textAlign = 'center';
            let elemChild = document.createElement('p');
            elemChild.innerText = ar[i].toString();
            elemChild.style.color = ELEM_TEXT_COLOR;
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

function isSortingChanged(){
    isSorting = !isSorting;
    let status = isSorting ? 'none' : 'auto'; 

//  Pointer Events
    generateArrayButton.style.pointerEvents = status;
    sizeInput.style.pointerEvents = status;
    speedInput.style.pointerEvents = status;
    bogoSortButton.style.pointerEvents = status;
    selectionSortButton.style.pointerEvents = status;
    insertionSortButton.style.pointerEvents = status;
    bubbleSortButton.style.pointerEvents = status;
    mergeSortButton.style.pointerEvents = status;
    quickSortButton.style.pointerEvents = status;
    
    stopSortingButton.style.pointerEvents = isSorting ? 'auto' : 'none';
}

function isEqual(ar, sortedAr){
    if(ar.length !== sortedAr.length) return false;
    for(let i=0; i<sortedAr.length; i++){
        if(sortedAr[i] !== ar[i]) return false;
    }
    return true;
}


sizeInput.value = INITIAL_SIZE_VALUE.toString();
speedInput.value = INITIAL_SPEED_VALUE.toString();
sizeChanged(INITIAL_SIZE_VALUE);
speedChanged(INITIAL_SPEED_VALUE);

function doSetTimeoutInsertion(k, [...ar]){
    setTimeout(function(){
        let swappedElems = getChangedElements(prevArr, ar);
        prevArr = ar;
        changeElementsAmount(ar);
        wrapper.childNodes[swappedElems[0]].style.backgroundColor = INSERTION_COLOR;
    }, k*timeInterval);
}

function doSetTimeoutSelection(k, [...ar], j , i, index){
    setTimeout(function(){
        changeElementsAmount(ar);
        wrapper.childNodes[i].style.backgroundColor = SELECTION_COLOR_1;
        wrapper.childNodes[j].style.backgroundColor = SELECTION_COLOR_2;
        wrapper.childNodes[index].style.backgroundColor = SELECTION_COLOR_3;
    }, k*timeInterval);
}

function doSetTimeoutMerge(k, i){
    setTimeout(function(){
        changeElementsAmount(visualizeArrMerge[i]);
        for(let j=indxArrMerge[i][0]; j<=indxArrMerge[i][1]; j++){
            wrapper.childNodes[j].style.backgroundColor = MERGE_COLOR;
        }
    }, k*timeInterval*10);
}

function doSetTimeoutQuick(k, [...ar]){
    setTimeout(function(){
        changeElementsAmount(ar);
    }, k*timeInterval);
}

function doSetTimeoutQuickElem(k, [...ar], i, j, pivotIndex, clr, pivotClr){
    setTimeout(function(){
        changeElementsAmount(ar);

        if(i >= 0) wrapper.childNodes[i].style.backgroundColor = clr;
        if(j >= 0) wrapper.childNodes[j].style.backgroundColor = clr;
        wrapper.childNodes[pivotIndex].style.backgroundColor = pivotClr;
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
    quickK++;
    let i = start;
    let j = end;
    let pivotIndex = Math.floor((start + end)/2);
    let pivot = arr[pivotIndex];

    while(i <= j){
        while(arr[i] < pivot){
            doSetTimeoutQuickElem(quickK, arr, i, j, pivotIndex, QUICK_COLOR_1, QUICK_COLOR_2);
            quickK++;
            i++;
        }

        while(arr[j] > pivot){
            doSetTimeoutQuickElem(quickK, arr, i, j, pivotIndex, QUICK_COLOR_1, QUICK_COLOR_2);
            quickK++;
            j--;
        }
        
        if(i <= j){
            doSetTimeoutQuickElem(quickK, arr, i, j, pivotIndex, QUICK_COLOR_1, QUICK_COLOR_2);
            quickK++;
            let tmp = arr[i];
            arr[i] = arr[j];
            arr[j] = tmp;
            i++;
            j--;
        }
    }
    doSetTimeoutQuick(quickK, arr);
    if(start < j){
        quickSort(arr, start, j);
    }
    if(i < end){
        quickSort(arr, i, end);
    }

}

function doSetTimeoutBubble(k, [...ar], index){
    setTimeout(function(){
        changeElementsAmount(ar);
        wrapper.childNodes[index].style.backgroundColor = BUBBLE_COLOR;
        wrapper.childNodes[index+1].style.backgroundColor = BUBBLE_COLOR;
    }, k*timeInterval);
}

// SORT FUNCTIONS
// ########################

function bogoSortClicked(){
    if(isEqual(arr, sortedArr)) {
        return;
    }
    isSortingChanged();
    let sortedArrBogo = [...arr].sort(function(a, b){
        return a-b;
    });

    setInterval(function(){
        // if(oscillator1On){
        //     oscillator1.stop();
        //     oscillator1.disconnect(audioCtx.destination);
        //     oscillator1On = false;
        // }
        changeElementsAmount(arr);
        if(isEqual(arr, sortedArrBogo)){
            stopClicked();
            setTimeout(function(){
                changeElementsAmount(sortedArrBogo);
            }, 10);
        }
        let a = Math.floor(Math.random()*arr.length);
        let b = Math.floor(Math.random()*arr.length);
        wrapper.childNodes[a].style.backgroundColor = 'red';
        wrapper.childNodes[b].style.backgroundColor = 'red';
        let tempBogo = arr[a];
        arr[a] = arr[b];
        arr[b] = tempBogo;
        oscillator1.type = 'square';
        oscillator1.frequency.value = arr[a]*3+200; 
        oscillator1.connect(audioCtx.destination);
        oscillator1.start();
        oscillator1On = true;
    }, timeInterval*2);
}


function selectionSortClicked(){
    if(isEqual(arr, sortedArr)) {
        return;
    }
    isSortingChanged();
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
        isSortingChanged();
    }, k*timeInterval);
    sortedArr = [...arr];
}

function insertionSortClicked(){
    if(isEqual(arr, sortedArr)) {
        return;
    }
    isSortingChanged();
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
        isSortingChanged();
    }, k*timeInterval);
    sortedArr = [...arr];
}

function bubbleSortClicked(){
    if(isEqual(arr, sortedArr)) {
        return;
    }
    isSortingChanged();
    let k = 1;
    for(let i=0; i<arr.length; i++){
        for(let j=0; j<arr.length-1-i; j++){
            if(arr[j] > arr[j+1]){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                doSetTimeoutBubble(k, arr, j);
                k++;
            }
        }
    }
    setTimeout(function(){
        changeElementsAmount(arr);
        isSortingChanged();
    }, k*timeInterval);
    sortedArr = [...arr];
}

function mergeSortClicked(){
    if(isEqual(arr, sortedArr)) {
        return;
    }
    isSortingChanged();
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
        isSortingChanged();
    }, k*timeInterval*10);
    sortedArr = [...arr];
}

function quickSortClicked(){
    if(isEqual(arr, sortedArr)) {
        return;
    }
    isSortingChanged();
    quickK = 0;
    quickSort(arr, 0, arr.length-1);
    setTimeout(function(){
        changeElementsAmount(arr);
        isSortingChanged();
    }, quickK*timeInterval);
    sortedArr = [...arr];
}

function stopClicked(){
    let timeoutId = setTimeout(function(){},0);
    let intervalId = setInterval(function(){},0);
    isSortingChanged();
    while(timeoutId >= 0){
        window.clearTimeout(timeoutId);
        timeoutId--;
    }
    while(intervalId >= 0){
        window.clearInterval(intervalId);
        intervalId--;
    }
    changeElementsAmount(shownArr);
    arr = [...shownArr];
}

function changeSoundValue(){
    soundOn = !soundOn;
    if(soundOn){
        icon.innerText = 'volume_up';
    } else{
        icon.innerText = 'volume_off';
    }
}