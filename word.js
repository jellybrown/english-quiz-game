export default class Word {
  constructor() {}

  choose(words, maxLength) {
    let random;
    let pickFinish = false;
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
  }
}
