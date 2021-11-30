//사용변수
const GAME_TIME = 9;
let score = 0;
let time = GAME_TIME;
let isPlaying = false;
let timeInterval;
let checkInterval;
let words = [];

const wordInput = document.querySelector('.word-input');
const wordDisplay = document.querySelector('.word-display');
const scoreDisplay = document.querySelector('.score');
const timeDisplay = document.querySelector('.time');
const button = document.querySelector('.button');

init();
function init() {
    buttonChange('게임로딩중...')
    getWords();
    wordInput.addEventListener('input', checkMatch)
}

// 게임 실행
function run() {
    if(isPlaying){
      return;
    }
    isPlaying = true;
    time = GAME_TIME;
    wordInput.focus();
    scoreDisplay.innerText = 0;
    timeInterval = setInterval(countDown, 1000);
    checkInterval = setInterval(checkStatus, 50);
    buttonChange('게임 중');
  }

  function checkStatus() {
    if(!isPlaying && time === 0) {
      buttonChange("게임시작");
      clearInterval(checkInterval);
    }
  }

// 단어 불러오기
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

// 단어일치 체크
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

    
function countDown(){
    time > 0 ? time-- : isPlaying = false; //0초가 됐을때 실행되는 삼행연산자
    if(!isPlaying){
        clearInterval(timeInterval);
    }
    timeDisplay.innerText = time;
}


function buttonChange(text){
    button.innerText = text;
    text === '게임시작' ? button.classList.remove('loading') : button.classList.add('loading')
}   


//innerText는 element 내부에 있는 text값을 말하며 innerHTML은 element 내부에있는 HTML이나 XML을 말함

// classList는 클래스를 조작하는 다양한 메서드를 쓸 수 있다.
// classList.add : 클래스를 필요에 따라 삽입한다
// classList.remove : 클래스를 필요에 따라 제거한다