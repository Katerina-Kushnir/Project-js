/*Все ответы на вопросы*/
let optionA = document.querySelector('.option_A');
let optionB = document.querySelector('.option_B');
let optionC = document.querySelector('.option_C');
let optionD = document.querySelector('.option_D');

let optionElements = document.querySelectorAll('.option'); //Все ответы

let question = document.getElementById('question'); //Вопрос
let numberOfQuestion = document.getElementById('number-of-question'); //Номер отвеченого вопроса
let numberOfAllQuestions = document.getElementById('number-of-all-question'); //Количество всех вопросов


let indexOfQuestion; //индекс текущего вопроса
let indexOfPage = 0; //индекс страниц

let listQuestions = document.getElementById('listQuestions'); //Список вопросов

let score = 0;

let correctAnswer = document.getElementById('correct-answer');
let numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2');

const buttonNext = document.getElementById('btn-next'); //кнопка следующего вопроса
const hallHelp = document.getElementById('hall-help'); //кнопка помощь зала
const fiftyFiftyBtn = document.getElementById('fiftyFifty'); //кнопка 50:50
const callFriend = document.getElementById('callFriend'); //кнопка звонок другу
const finishGame = document.getElementById('finishGame'); //кнопка закончить игру

//модальное окно
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];

const questions = [ //вопросы и ответы
    {
        question: 'Кто приходит на Новый год к хорошим детям?',
        options: [
            'Баба Яга',
            'Дед Мороз',
            'Стоматолог',
            'Серый волк',
        ],
        rightAnsver: 1
    },
    {
        question: 'Кто такие Том и Джери?',
        options: [
            'Дельфин и русалка',
            'Лев и собачка',
            'Кот и мышь',
            'Волк и заяц',
        ],
        rightAnsver: 2
    },
    {
        question: 'Как называется одна из сказок Ш.Перро?',
        options: [
            'Кошка в сарафане',
            'Петушок в сапожках',
            'Курочка в сережках',
            'Кот в сапогах',
        ],
        rightAnsver: 3
    },
    {
        question: 'Как называется вращающаяся детская игрушка?',
        options: [
            'Волкодав',
            'Волк',
            'Волчок',
            'Волчонок',
        ],
        rightAnsver: 2
    },
    {
        question: 'Что нужно делать когда утром звенит будильник?',
        options: [
            'Выключить его и встать с постели',
            'Бросить на него подушку и спать дальше',
            'Поднести к бабушкиному уху',
            'Бросить его в окно',
        ],
        rightAnsver: 0
    },
    {
        question: 'Что чаще всего вешают на елку?',
        options: [
            'Шарики',
            'Кубики',
            'Тюбики',
            'Зубики',
        ],
        rightAnsver: 0
    },
    {
        question: 'Что растет на дубе?',
        options: [
            'Шишки',
            'Яблоки',
            'Желуди',
            'Златая цепь',
        ],
        rightAnsver: 2
    },
    {
        question: 'Во что превращается вода на морозе?',
        options: [
            'В пар',
            'В лед',
            'В газ',
            'В кисель',
        ],
        rightAnsver: 1
    },
    {
        question: 'На чем летает ведьма?',
        options: [
            'На венике',
            'На швабре',
            'На метле',
            'На пылесосе',
        ],
        rightAnsver: 2
    },
    {
        question: 'На что обычно бывает похожа лампочка?',
        options: [
            'На банан',
            'На арбуз',
            'На ананас',
            'На грушу',
        ],
        rightAnsver: 3
    },
    {
        question: 'Для чего детям дают соску-пустышку?',
        options: [
            'Чтобы не болтали',
            'Чтобы не плевались',
            'Чтобы не курили',
            'Чтобы не плакали',
        ],
        rightAnsver: 3
    },
    {
        question: 'Куда нужно посмотреть, перед тем как открыть гостям входную дверь?',
        options: [
            'В глазок',
            'В носок',
            'В роток',
            'В ушко',
        ],
        rightAnsver: 0
    },
    {
        question: 'Какое из этих прозвищ относится к зайчишке?',
        options: [
            'Трусишка',
            'Врунишка',
            'Воришка',
            'Дурачишка',
        ],
        rightAnsver: 0
    },
    {
        question: 'С какой жалобой пришла к Айболиту лиса?',
        options: [
            'Я разута совсем и боса',
            'Я не ела четыре часа',
            'Ой, меня укусила оса',
            'Подевалась куда-то краса',
        ],
        rightAnsver: 2
    },
    {
        question: 'Кто такой Чиполлино?',
        options: [
            'Лимон',
            'Помидор',
            'Лук',
            'Чеснок',
        ],
        rightAnsver: 2
    },
];

numberOfAllQuestions.innerHTML = questions.length;

function load() {
    question.innerHTML = questions[indexOfQuestion].question; //вопрос

    optionA.innerHTML = questions[indexOfQuestion].options[0]; //ответы
    optionB.innerHTML = questions[indexOfQuestion].options[1];
    optionC.innerHTML = questions[indexOfQuestion].options[2];
    optionD.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей страницы
    indexOfPage++; //увеличение номера страницы
};

let completedAnswers = [];

const randomQuestion = () => { //рандомный вопрос
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDublicate = false;

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if (item == randomNumber) {
                    hitDublicate = true;
                }
            });
            if (hitDublicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load();
            }
        };
        if (completedAnswers == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    };
    completedAnswers.push(indexOfQuestion);
}; 

let arrayLi = document.querySelectorAll('ol > li > p');

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnsver) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        
        for (i = score; i < arrayLi.length; i++) {  //подсветка li зеленым цветом при правильном ответе
            arrayLi[score].style.color = '#1DE700';
        }

        let test = document.getElementsByTagName("p")[score].textContent;
        

        score++; 
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');    
        
        if (score < 5) {
            alert ('Ваш выигрыш составил 0 грн');
        } else if (score < 10){
            alert ('Ваш выигрыш составил 1 000 грн');
        } else {
            alert ('Ваш выигрыш составил 32 000 грн');
        }
            
    }
    disableOptions();

    clearInterval(counter);
    
};

document.querySelectorAll('ol > li').forEach(n => n.parentNode.prepend(n)); //изменяет порядок элементов li на обратный

const disableOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnsver) {
            item.classList.add('correct');
        }
    });
};

const enableOptions = () => { //при переключении на следующий вопрос убирает добавленные классы с предыдущего вопроса
    optionElements.forEach(item => {
        item.classList.remove('correct', 'wrong', 'disabled', 'hidden', 'help');
        clearInterval(counter);
    })
};

//подсказки
const randomNumHelp = (num) => Math.floor(Math.random() * num);

fiftyFiftyBtn.addEventListener('click', () => { //подсказка 50:50
    fiftyFiftyBtn.classList.add('wrong'); 
    fiftyFiftyBtn.classList.add('disabled');

    let correctIndex = getCorrectAnswer();
    let count = 0;
    let result1;
    let result2;

    while(count < 2) {
        
        if (result1 !== 0 && !result1) {
            result1 = randomNumHelp(3);
            if(correctIndex != result1) {
                count++;
            }
        } else {
            result2 = randomNumHelp(3);
            if (result1 != result2 && correctIndex != result2) {
                count++;
            }
        }
    }

    if(result1 != optionElements.rightAnsver && result2 != optionElements.rightAnsver) {
        optionElements[result1].classList.add('hidden');
        optionElements[result2].classList.add('hidden');
    } return;

});

hallHelp.addEventListener('click', () => { //подсказка помощь зала
    hallHelp.classList.add('wrong'); 
    hallHelp.classList.add('disabled');

    let result4 = randomNumHelp(3);

    optionElements[result4].classList.add('help');   
});

callFriend.addEventListener('click', () => { //подсказка звонок другу
    callFriend.classList.add('wrong'); 
    callFriend.classList.add('disabled');

    let result3 = randomNumHelp(3);

    optionElements[result3].classList.add('help');   
});

finishGame.addEventListener('click', () => { //кнопка забрать выиграш
    if (score == 1) {
        alert ('Ваш выигрыш составил 100 грн');
    } else if (score == 2){
        alert ('Ваш выигрыш составил 200 грн');
    } else if (score == 3){
        alert ('Ваш выигрыш составил 300 грн');
    } else if (score == 4){
        alert ('Ваш выигрыш составил 500 грн');
    } else if (score == 5){
        alert ('Ваш выигрыш составил 1 000 грн');
    } else if (score == 6){
        alert ('Ваш выигрыш составил 2 000 грн');
    } else if (score == 7){
        alert ('Ваш выигрыш составил 4 000 грн');
    } else if (score == 8){
        alert ('Ваш выигрыш составил 8 000 грн');
    } else if (score == 9){
        alert ('Ваш выигрыш составил 16 000 грн');
    } else if (score == 10){
        alert ('Ваш выигрыш составил 32 000 грн');
    } else if (score == 11){
        alert ('Ваш выигрыш составил 64 000 грн');
    } else if (score == 12){
        alert ('Ваш выигрыш составил 125 000 грн');
    } else if (score == 13){
        alert ('Ваш выигрыш составил 250 000 грн');
    } else {
        alert ('Ваш выигрыш составил 500 000 грн');
    }
});

//вычисление индекса правильного ответа
const getCorrectAnswer = () => {
    let correctAnswer;
    optionElements.forEach(item => {
        if (item.dataset.id == questions[indexOfQuestion].rightAnsver) {
            correctAnswer = item.dataset.id;
        }
    });
    return correctAnswer;
};


let count=31;
let counter = setInterval(timer, 1000); 
let counter2;

function timer() { //таймер
    count=count-1;
    if (count <= -1)   {
        clearInterval(counter);
        alert('Game over');  //нужно оформить как модальное окно
        return;
    } 
    document.getElementById("timer").innerHTML=count; 
};

const updateAnswerTracker = status => {   //функция, которая должна окрашивать в зеленый цвет в списке правильные ответы
    listQuestions.children[indexOfPage - 1].classList.add(`${status}`);
};

const validate = () => { //функция, которая запрещает нажимать кнопку далее, если ответ не выбран
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Ответ не выбран');
    } else {
		if (counter) {
			clearInterval(counter);
		}
		if (counter2) {
			clearInterval(counter2)
		}
        randomQuestion();
        enableOptions();
        
        count=31;
        counter2 = setInterval(timer, 1000); 
    }
};

buttonNext.addEventListener('click', validate);  //перейти к следующему вопросу

for (option of optionElements) {  //выбор (нажатие) ответа
    option.addEventListener('click', e => checkAnswer(e))
};

function myModal() {
    modal.style.display = "block";
            
    span.onclick = function() {
        modal.style.display = "none";

    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}

const quizOver = () => {
    //alert('Игра окончена! Вы выиграли 1 000 000 грн');
    myModal();
};

window.addEventListener('load', () => {  //загрузка вопросов
    randomQuestion();
});

