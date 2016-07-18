(() => {
  'use strict';

  let currentWord, nextWord, currentLocation, score, miss, isStarted, timer, timerId;

  const target = document.getElementById('js-target');
  const scoreLabel = document.getElementById('js-score');
  const missLabel = document.getElementById('js-miss');
  const timerLabel = document.getElementById('js-timer');

  // init
  (() => {
    currentWord = 'click to start';
    [currentLocation, score, miss, timer, isStarted] = [0, 0, 0, 20, false];

    target.textContent = currentWord;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    timerLabel.textContent = timer;
  })();

  function updateTimer() {
    timerId = setInterval(() => {
      timerLabel.textContent = --timer;
      if (timer <= 0) {
        let accuracy = (score + miss) === 0 ? '0.00' : ((score / (score + miss) * 100)).toFixed(2);
        alert(`${score} letters, ${miss} miss!, accuracy ${accuracy}%`);
        clearTimeout(timerId);
        return;
      }
    }, 1000);
  }

  function setTarget() {
    target.textContent = currentWord = words[Math.floor(Math.random() * words.length)];
    currentLocation = 0;
  }

  window.addEventListener('click', (e) => {
    if (!isStarted) {
      isStarted = true;
      setTarget() ;
      updateTimer();
    }
  }, false);

  window.addEventListener('keyup', (e) => {
    if (!isStarted) return;

    // 押したキーが押すべき文字と等しいかどうか判定
    if (String.fromCharCode(e.keyCode) === currentWord[currentLocation].toUpperCase()) {
      currentLocation++;

      // 正しく押された文字は「＿」で表示する
      let placeholder = '';
      for (var i = 0; i < currentLocation; i++) {
        placeholder += '_';
      }
      target.textContent = placeholder + currentWord.substring(currentLocation);

      // スコアをプラス
      scoreLabel.textContent = ++score;

      if (currentLocation === currentWord.length) {
        setTarget();
      }
    } else {

      // ミスをプラス
      missLabel.textContent = ++miss;
    }
  }, false);


})();
