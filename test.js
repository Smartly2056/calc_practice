'use strict'
{

    // 問題セットを生成
    function generateQuiz() {
        const quizDataSet = []

        for (let i = 0; i < quizDataSum; i++) {
            let num01 = Math.floor(Math.random() * 900 + 100) + 1;
            let num02 = Math.floor(Math.random() * 900 + 100) + 1;
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

    const quizDataSum = 5;
    const quizDataSet = generateQuiz();

    // 問題表示用
    const questionElm = document.getElementById('question');
    const questionNum = document.getElementById('question-number');
    const choices = document.getElementById('choices');
    const submitBtn = document.getElementById('submit');
    submitBtn.style.display = 'none';
    const homeElm = document.getElementById('home-container');

    // 現在の問題カウンタ
    let currentQuiz = 0;

    // 結果表示用
    const quizHeaderElm = document.getElementById('quiz-container');
    const resultsConElm = document.getElementById('results-container');
    const resultsElm = document.getElementById('results');
    const nextQuizBtn = document.getElementById('next-quiz');
    const resetBtn = document.getElementById('reset');


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
            li.classList.add(`option${i}`)

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

    // // クリックした選択肢のアクション
    // const checked = document.quizForm.answer.value;

    // 問題を表示
    function showQuiz() {
        quizHeaderElm.style.display = 'block';
        resultsConElm.style.display = 'none';
    }

    // 回答後の表示
    function showResults(results) {
        quizHeaderElm.style.display = 'none';
        resultsConElm.style.display = 'block';
        resultsElm.innerText = results;
        resetBtn.style.display = 'none';

        if (currentQuiz == quizDataSum - 1) {
            resetBtn.style.display = 'block';
            nextQuizBtn.style.display = 'none';
        }
    }

    // カウントダウン関数
    const start = document.getElementById('start');
    const timer = document.getElementById('timer');

    let startTime;
    let timeoutId;

    function countUp() {
        const d = new Date(Date.now() - startTime);
        const m = String(d.getMinutes()).padStart(2, '0');
        const s = String(d.getSeconds()).padStart(2, '0');
        const ms = String(d.getMilliseconds()).padStart(3, '0');
        timer.textContent = `${m}:${s}:${ms}`;

        timeoutId = setTimeout(() => {
            countUp();
        }, 10);
    }

    start.addEventListener('click', () => {
        startTime = Date.now();
        countUp();
        homeElm.style.display = 'none';

        quizHeaderElm.style.display = 'block';
        submitBtn.style.display = 'block';

    });

    // 回答ボタンのアクション
    submitBtn.addEventListener('click', () => {
        const answer = getAnswered();

        const input = document.querySelector(`input[value="${answer}"]`);

        if (input.classList.contains('is-correct')) {
            showResults('正解！');
        } else {
            showResults('残念！');

            const correct = document.createElement('p');
            correct.textContent = `正解 : ${quizDataSet[currentQuiz].c[0]}`
            resultsElm.appendChild(correct);
        }

        if (currentQuiz == quizDataSum - 1) {
            clearTimeout(timeoutId);
        }

    });

    // 次の問題ボタンのアクション
    nextQuizBtn.addEventListener('click', () => {
        currentQuiz++;

        if (currentQuiz < quizDataSum) {
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

    // リセットボタンのアクション
    resetBtn.addEventListener('click', () => {
        window.location.reload();
    });










}