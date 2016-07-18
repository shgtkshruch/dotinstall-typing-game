(() => {
  'use strict';

  const words = [
      'apple',
      'imagine',
      'supply',
      'fun',
      'happy',
      'air',
      'sky'
    ];

  let currentWord, currentLocation, score, miss, isStarted, timer, timerId;

  const target = document.getElementById('js-target');
  const scoreLabel = document.getElementById('js-score');
  const missLabel = document.getElementById('js-miss');
  const timerLabel = document.getElementById('js-timer');

  (function init() {
    currentWord = 'click to start';
    [currentLocation, score, miss, timer] = [0, 0, 0, 3];

    target.textContent = currentWord;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    timerLabel.textContent = timer;
    isStarted = false;
  })();

  function updateTimer() {
    timerId = setInterval(function() {
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
    currentWord = words[Math.floor(Math.random() * words.length)];
    target.textContent = currentWord;
    currentLocation = 0;
  }

  window.addEventListener('click', function (e) {
    if (!isStarted) {
      isStarted = true;
      setTarget() ;
      updateTimer();
    }
  }, false);

  window.addEventListener('keyup', function (e) {
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
