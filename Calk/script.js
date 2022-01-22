const calc = document.querySelector('.calc');
const result = document.querySelector('#result');

let a = '';
let b = '';
let sing = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '00'];
const action = ['-', '+', '*', '/', '%'];

function clearAll () {
    a = '';
    b = '';
    sing = '';
    finish = false;
    result.textContent = 0;
};

document.querySelector('.calc_btn_reset').onclick = clearAll;

calc.addEventListener('click', function(event) {
    if(!event.target.classList.contains('calc_btn')) return;
    if(event.target.classList.contains('calc_btn_reset')) return;

    result.textContent = '';

    const key = event.target.textContent; //получение нажатой кнопки

    if (digit.includes(key)) { //проверка если нажаты кнопки с цифрами
        if (b === '' && sing === '') {
            a += key;
            result.textContent = a;
        } else if (a !== '' && b !== '' && finish) {
            b = key;
            finish = false;
            result.textContent = b;
        } else {
            b += key;
            result.textContent = b;
        }
        return;
    }

    if (action.includes(key)) { //проверка если нажаты кнопки с математическими операциями
        sing = key;
        result.textContent = sing;
        return;
    }

    //нажата кнопка '='
    if (key === '=') {
         switch(sing) {
            case "+":
                a = (+a) + (+b);
                break;
            case "-":
                a = a - b;
                break;
            case "*":
                a = a * b;
                break;
            case "/":
                if (b === '0') {
                    result.textContent = 'Ошибка';
                    a = '';
                    b = '';
                    sing = '';
                    return;
                }
                a = a / b;
                break;
            case "%":
                if (b === '') b=1; 
                a = a * (b / 100);
                break;
        }

        if (b === '') b = a;

        finish = true;
        result.textContent = a;
    }
});
