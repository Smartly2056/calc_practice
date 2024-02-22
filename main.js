'use strict'
{

  // 問題セットを生成
  function generateQuiz() {
    const quizDataSet = []

    for (let i = 0; i < 5; i++) {
      let num01 = Math.floor(Math.random() * 1000) + 1;
      let num02 = Math.floor(Math.random() * 1000) + 1;
      let answer01 = num01 * num02;
      let answer02 = num01 * num02 + 10;
      let answer03 = num01 * num02 - 10;
      let answer04 = num01 * num02 + 20;

      let quizData = {
        q: `${num01} x ${num02}`,
        c: [
          `${answer01}`,
          `${answer02}`,
          `${answer03}`,
          `${answer04}`,
        ]
      };
      quizDataSet.push(quizData);
    }

    return quizDataSet;
  }

  const quizDataSet = generateQuiz();

  // 問題表示用
  const questionElm = document.getElementById('question');
  const questionNum = document.getElementById('question-number');
  const choices = document.getElementById('choices');
  const submitBtn = document.getElementById('submit');

  // 現在の問題カウンタ
  let currentQuiz = 0;

  // 結果表示用
  const quizHeaderElm = document.getElementById('quiz-header');
  const resultsConElm = document.getElementById('results-container');
  const resultsElm = document.getElementById('results');
  const nextQuizBtn = document.getElementById('next-quiz');


  loadQuiz();

  // 問題ロード
  function loadQuiz() {
    const shuffledChoices = shuffle([...quizDataSet[currentQuiz].c]);

    questionElm.textContent = quizDataSet[currentQuiz].q;
    questionNum.textContent = `第${currentQuiz + 1}問`;

    // 選択肢を生成
    for (let i = 0; i < 4; i++) {
      const li = document.createElement('li');
      const input = document.createElement('input');
      const label = document.createElement('label');
      input.type = 'radio';
      input.name = 'answer';
      input.id = `${i}`;
      input.value = `${i}`;
      label.htmlFor = input.id;
      label.textContent = shuffledChoices[i];

      if (label.textContent == quizDataSet[currentQuiz].c[0]) {
        input.classList.add('is-correct');
      } else {
        input.classList.add('is-incorrect');
      }

      choices.appendChild(li);
      li.appendChild(input);
      li.appendChild(label);
    }
  }

  // シャッフル関数
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  // 回答を取得
  function getAnswered() {
    return document.quizForm.answer.value;
  }

  // 問題を表示
  function showQuiz() {
    quizHeaderElm.style.display = 'block';
    submitBtn.style.display = 'block';
    resultsConElm.style.display = 'none';
  }

  // 回答後の表示
  function showResults(results) {
    quizHeaderElm.style.display = 'none';
    submitBtn.style.display = 'none';
    resultsConElm.style.display = 'block';
    resultsElm.innerText = results;
  }


  // カウントダウン関数
  // let startTime;

  // function countUp() {
  //   console.log(Date.now() - startTime);
  //   setTimeout(() => {
  //     countUp();
  //   }, 10);
  // }






  // 回答ボタンのアクション
  submitBtn.addEventListener('click', () => {
    const answer = getAnswered();

    const input = document.querySelector(`input[value="${answer}"]`);

    // if (currentQuiz == 0) {
    //   startTime = Date.now();
    //   countUp();
    // }


    if (input.classList.contains('is-correct')) {
      showResults('正解！');
    } else {
      showResults('残念！');
    }
  });

  // 次の問題ボタンのアクション
  nextQuizBtn.addEventListener('click', () => {
    currentQuiz++;

    if (currentQuiz < 5) {
      // リストの削除
      while (choices.firstChild) {
        choices.removeChild(choices.firstChild);
      }
      // 新しい問題と選択肢の生成
      loadQuiz();
      showQuiz();
    } else {
      window.location.reload();
    }
  });


  const timer = document.getElementById('timer');






}











