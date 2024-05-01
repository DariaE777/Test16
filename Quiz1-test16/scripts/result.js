(function () {
    const Result = {
        showAnswersElement: null,
        testId: null,
        init() {

            const url = new URL(location.href);
            this.testId = url.searchParams.get('id');
            document.getElementById('result-score').innerText = url.searchParams.get('score') + '/' +
                url.searchParams.get('total');
            this.showAnswersElement = document.getElementById('show-answers');
            this.showAnswersElement.onclick = ()=> {
                this.goTo();
            };
        },

        goTo() {
            location.href = 'answers.html' + location.search;
        }
    }
    Result.init();
})();
