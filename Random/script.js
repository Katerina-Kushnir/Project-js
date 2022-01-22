let min;
let max;
let amount;
let initialDataMin;
let initialDataMax;
let today;

function Random () {
    min = forma.numberMin.value;
    max = forma.numberMax.value;
    return Math.floor(Math.random() * (Number(max) - Number(min) + 1)) + Number(min);   
}

let btn = document.getElementById('button');
let rez = document.getElementById('rez');

initialDataMin = document.getElementById('minRez');
initialDataMax = document.getElementById('maxRez');
today = document.getElementById('date');

function Click() {
    amount = forma.amount.value;

    if (rez != null) {
        rez.textContent = '';
    }

    for(let i = 1; i <= Number(amount); i++) {
        rez.textContent += Random() + ', ';
    }

    addText();
}

function addText () {
    rez;
    initialDataMin.textContent = `Min: ${min}` + ",";
    initialDataMax.textContent = `Max: ${max}`;
    today.textContent = new Date().toLocaleString();
}




