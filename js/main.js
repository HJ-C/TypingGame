const GAME_TIME = 5;
let score = 0;
let time = GAME_TIME;
let isPlaying = false
let timeInterval;
let checkInterval;
let words = []

const wordInput = document.querySelector('.word-input')
const wordDisplay = document.querySelector('.word-display')
const scoreDisplay = document.querySelector('.score')
const timeDisplay = document.querySelector('.time')
const button = document.querySelector('.button')

init()

function init(){
    buttonChange('게임로딩중...')
    getWords()
    wordInput.addEventListener('input',checkMatch)  
}


// 게임실행
function run(){
    if (isPlaying){
        return
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus()
    scoreDisplay.innerText = 0
    timeInterval= setInterval(countDown,1000)
    checkInterval = setInterval(checkStatus, 50)
    buttonChange('게임중')
}

function checkStatus(){
    if(!isPlaying && time === 0){
        buttonChange('게임시작')
        clearTimeout(checkInterval)
    }
}

// 단어불러오기
function getWords(){
    axios.get('https://random-word-api.herokuapp.com/word?number=100')
        .then(function (response) {
            response.data.forEach((word)=>{
                if(word.length < 10) {
                    words.push(word);
                }
            })
            buttonChange('게임시작')
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
}



// 단어 맞춤
function checkMatch(){
    if(wordInput.value.toLowerCase() === wordDisplay.innerText.toLowerCase()){
        wordInput.value = "";
        if(!isPlaying){
            return;
        }
        score++;
        scoreDisplay.innerText = score; //html 표시해줌
        time = GAME_TIME; //설정값 
        const randomIndex = Math.floor(Math.random()* words.length)
        wordDisplay.innerText = words[randomIndex]
    }
}



// 카운트다운
function countDown(){
    time > 0 ? time-- : isPlaying = false; //0초가 됐을때 실행되는 삼행연산자
    if(!isPlaying){
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}
// 버튼
function buttonChange(text){
    button.innerText = text
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading')
}
