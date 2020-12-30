"use strict";

const PICK_WORD_LENGTH = 5; //게임의 단어 갯수

const btns = document.querySelector(".btn_group");

let wordData = [];
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => wordData.push(data));

let random;
let pickFinish = false;
let fiveWord;
const chooseWord = (words, maxLength) => {
  //랜덤숫자 5개를 만들고 뽑기
  let pickWords = [];
  let pickNumbers = [];

  for (let i = 0; i < 20; i++) {
    if (!pickFinish) {
      random = Math.floor(Math.random() * maxLength);
      if (pickNumbers.includes(random)) {
        random = Math.floor(Math.random() * maxLength);
      } else {
        pickWords.push(words[random]);
        pickNumbers.push(random);
      }
      if (pickNumbers.length === 5) {
        pickFinish = true;
      }
    }
  }
  return pickWords;
};

const mainPage = document.querySelector(".main_page");
const gamePage = document.querySelector(".game_page");
const wordSection = document.querySelector(".game_word");
const answer = document.querySelector(".answer");

const serverData = () => ({
  data: [성명, 진술, 진술서],
});
let enteredAnswer;
let index = 0;
const startGame = (fiveWord) => {
  // startTimer();
  // startHeart();
  // 메인화면을 없애는 클래스이름 추가
  mainPage.classList.add("remove");
  gamePage.classList.remove("remove");

  //단어넣는 부분 함수로 빼기
  //answer: input에 입력한 정답

  //한 단어마다 게임이 실행되어야 함 -> 5번의 함수를 호출
  // 정답이 맞으면 앤서리스너와 다음단어를 가져오는 함수를 호출

  answerListener(); // 한번 실행하면 계속 있을것
  openNextWord(0);
  console.log("glgl");
};

//첫 단어가 나오려면 먼저 openNextWord를 한번 실행해야하나?
const openNextWord = (index) => {
  wordSection.innerHTML = fiveWord[index];
};
const serverResponse = "안녕";
const answerListener = () => {
  // 이아이는 브라우저가 닫힐때까지 있을것, 점수가 나오면 꺼줘야하나?
  document.addEventListener("keypress", function (e) {
    if (e.target.classList.contains("answer")) {
      if (e.key === "Enter") {
        e.preventDefault();
        enteredAnswer = e.target.value;
        //서버에 enteredAnswer 보내서 결과 가져오기
        console.log(enteredAnswer);
        if (enteredAnswer === serverResponse) {
          index++;
          openNextWord(index);
        }
        //정답이 맞으면 openNextWord(index)를 부른다. index에는 다음번호를 불러준다.
      }
    }
  });
};

const init = (e) => {
  // 1. 유저가 레벨을 누름 -> 단어들을 뽑음
  const level = e.target.getAttribute("class");
  const selectedData = wordData[0][level];
  const maxLength = selectedData.length;

  fiveWord = chooseWord(selectedData, maxLength);
  console.log(fiveWord); // [word, 이렇게, 으으]

  // 2. 뽑힌 단어들로 게임을 시작함

  startGame(fiveWord);
};

btns.addEventListener("click", init);
