"use strict";
import Word from "/word.js";

const btns = document.querySelector(".btn_group");
const word = new Word();
console.log(word);
let wordData = [];
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => wordData.push(data));

let fiveWord;
let score;

const chooseWord = (words, maxLength) => {
  //랜덤숫자 5개를 만들고 뽑기
  word.choose(words, maxLength);
};

const mainPage = document.querySelector(".main_page");
const gamePage = document.querySelector(".game_page");
const wordSection = document.querySelector(".game_word");
const answer = document.querySelector(".answer");

const serverData = () => ({
  data: [성명, 진술, 진술서],
});
const totalScore = 5;
let index = 0;
let userScore;
let enteredAnswer;

const startGame = (fiveWord) => {
  // startTimer();
  // startHeart();
  // 메인화면을 없애는 클래스이름 추가
  mainPage.classList.add("hide");
  gamePage.classList.remove("hide");
  console.log(fiveWord);
  //단어넣는 부분 함수로 빼기
  //answer: input에 입력한 정답

  //한 단어마다 게임이 실행되어야 함 -> 5번의 함수를 호출
  // 정답이 맞으면 앤서리스너와 다음단어를 가져오는 함수를 호출

  // answerListener(); // 한번 실행하면 계속 있을것
  openNextWord(0);
  console.log("glgl");
};

//첫 단어가 나오려면 먼저 openNextWord를 한번 실행해야하나?
const openNextWord = (index) => {
  setTimeout(() => {
    wordSection.innerHTML = fiveWord[index];
  }, 1500);
};
const serverResponse = "안녕";

const answerListener = document.addEventListener("keypress", function (e) {
  if (e.target.classList.contains("answer")) {
    if (e.key === "Enter") {
      e.preventDefault();
      if (index === 5) return;
      enteredAnswer = e.target.value;
      //서버에 enteredAnswer 보내서 결과 가져오기
      console.log(enteredAnswer);

      if (enteredAnswer === serverResponse) {
        console.log(index, "정답");
        index++;
        openNextWord(index);
      }

      //정답이 맞으면 openNextWord(index)를 부른다. index에는 다음번호를 불러준다.
    }
  }
});

const init = (e) => {
  // 1. 유저가 레벨을 누름 -> 단어들을 뽑음
  const level = e.target.getAttribute("class");
  const selectedData = wordData[0][level];
  const maxLength = selectedData.length;

  fiveWord = word.choose(selectedData, maxLength);

  console.log(fiveWord); // [word, 이렇게, 으으]

  // 2. 뽑힌 단어들로 게임을 시작함

  startGame(fiveWord);
};

btns.addEventListener("click", init);
