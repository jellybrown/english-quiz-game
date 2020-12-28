"use strict";

const PICK_WORD_LENGTH = 5; //게임의 단어 갯수

const btns = document.querySelector(".btn_group");

let wordData = [];
fetch("./data.json")
  .then((response) => response.json())
  .then((data) => wordData.push(data));

let random;
let pickFinish = false;
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

const startGame = (fiveWord) => {
  // startTimer();
  // startHeart();
  // 메인화면을 없애는 클래스이름 추가
  mainPage.classList.add("remove");
  gamePage.classList.remove("remove");
};

const init = (e) => {
  // 1. 유저가 레벨을 누름 -> 단어들을 뽑음
  const level = e.target.getAttribute("class");
  const selectedData = wordData[0][level];
  const maxLength = selectedData.length;

  const fiveWord = chooseWord(selectedData, maxLength);
  console.log(fiveWord); // [word, 이렇게, 으으]

  // 2. 뽑힌 단어들로 게임을 시작함

  startGame(fiveWord);
};

btns.addEventListener("click", init);
