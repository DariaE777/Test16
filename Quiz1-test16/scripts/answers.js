(function () {
    const Answers = {
        userName: null,
        userLastName: null,
        userEmail: null,
        quiz: null,
        allQuestions: null,
        keyAnswers: [],
        correctAnswersId: [],
        chosenAnswersId: [],


        init() {
            const url = new URL(location.href);
            const testId = url.searchParams.get('id');
            this.userName = url.searchParams.get('name');
            this.userLastName = url.searchParams.get('lastName');
            this.userEmail = url.searchParams.get('email');

            if (testId) {
                const xhr1 = new XMLHttpRequest();
                const xhr2 = new XMLHttpRequest();
                xhr1.open('GET', 'https://testologia.ru/get-quiz?id=' + testId, false);
                xhr2.open('GET', 'https://testologia.ru/get-quiz-right?id=' + testId, false);
                xhr1.send();
                xhr2.send();

                if (xhr1.status === 200 && xhr2.status === 200 && xhr1.responseText && xhr2.responseText) {
                    try {
                        this.quiz = JSON.parse(xhr1.responseText);
                        this.keyAnswers = JSON.parse(xhr2.responseText);
                    } catch (e) {
                        location.href = 'index.html';
                    }
                    this.showTest();

                } else {
                    location.href = 'index.html';
                }
            } else {
                location.href = 'index.html';
            }

            // if (testId) {
            //     const xhr = new XMLHttpRequest();
            //     xhr.open('GET', 'https://testologia.ru/get-quiz-right?id=' + testId, false);
            //     xhr.send();
            //
            //     if (xhr.status === 200 && xhr.responseText) {
            //         try {
            //             this.keyAnswers = JSON.parse(xhr.responseText);
            //         } catch (e) {
            //             location.href = 'index.html';
            //         }
            //         this.checkAnswers();
            //
            //     } else {
            //         location.href = 'index.html';
            //     }
            // } else {
            //     location.href = 'index.html';
            // }
        },

        showTest() {
            document.getElementById('test-number').innerText = this.quiz.name;
            document.getElementById('user-name-id').innerText = this.userName + ' ' + this.userLastName + ', ' + this.userEmail;
            this.allQuestions = this.quiz.questions;

            this.allQuestions.forEach((question, questionIndex) => {
                const questionText = question.question;
                questionIndex = question.id;
                const questionElement = document.createElement('div');
                questionElement.className = 'answers-question-title';
                questionElement.innerHTML = '<span>Вопрос ' + questionIndex + ':</span> ' + questionText;
                const questionContainer = document.querySelector('.answers-question');
                questionContainer.appendChild(questionElement);

                question.answers.forEach(answer => {

                    const optionsElement = document.createElement('div');
                    optionsElement.className = 'answers-question-options';

                    const optionElement = document.createElement('div');
                    optionElement.className = 'answers-question-option';

                    const inputId = 'answer-' + answer.id;

                    const inputElement = document.createElement('input');
                    inputElement.className = 'question-option-answer';
                    inputElement.setAttribute('id', inputId);
                    inputElement.setAttribute('type', 'radio');
                    inputElement.setAttribute('name', 'answer');
                    inputElement.setAttribute('value', answer.id);

                    const labelElement = document.createElement('label');
                    labelElement.setAttribute('for', inputId);
                    labelElement.innerText = answer.answer;
                    optionElement.appendChild(inputElement);
                    optionElement.appendChild(labelElement);
                    optionsElement.appendChild(optionElement);
                    questionContainer.appendChild(optionsElement);
                });
            })

            let answersId = [];
           if (this.keyAnswers && this.keyAnswers.length > 0) {
                this.keyAnswers = this.keyAnswers.map(item => item.toString());
                for (let i = 0; i < this.keyAnswers.length; i++) {
                   answersId = (sessionStorage.getItem(i) || '').split(',').map(item => item || null);

                    let chosenAnswer = answersId.pop();
                    let correctAnswer = this.keyAnswers[i];
                    let correctAnswerId = answersId.findIndex(answer => answer === correctAnswer);
                    console.log(correctAnswerId);
                    let chosenAnswerId = answersId.findIndex(answer => answer === chosenAnswer);
                    this.correctAnswersId.push(correctAnswer ? correctAnswerId : null);
                    this.chosenAnswersId.push(chosenAnswer ? chosenAnswerId : null);
                }
            }
        },
    }

    Answers.init();
})();