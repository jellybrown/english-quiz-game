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
  console.log(pickWords);
};

const initGame = (e) => {
  const level = e.target.getAttribute("class");
  const selectedData = wordData[0][level];
  const maxLength = selectedData.length;

  chooseWord(selectedData, maxLength);
};

btns.addEventListener("click", initGame);
