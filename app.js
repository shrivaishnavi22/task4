
const questions = [
    {
        text: 'Which tag is a heading?',
        choices: ['h1', 'p', 'div'],
        answer: 0
    },
    {
        text: 'Which language styles a page?',
        choices: ['CSS', 'SQL', 'C++'],
        answer: 0
    },
    {
        text: 'How many days in a week?',
        choices: ['5', '7', '9'],
        answer: 1
    }
];

let index = 0;
let score = 0;
let answered = false;

// Display the current question and answer buttons
function render() {
    const question = questions[index];

    document.getElementById('question').textContent =
        question.text;

    document.getElementById('feedback').textContent = '';

    document.getElementById('answers').replaceChildren();

    document.getElementById('score').textContent = '';

    answered = false;

    question.choices.forEach((choice, i) => {
        const button = document.createElement('button');

        button.textContent = choice;
        button.type = 'button';

        button.onclick = () => {
            // Prevent multiple answers
            if (answered) return;

            answered = true;

            // Check selected answer
            if (i === question.answer) {
                score++;

                document.getElementById('feedback').textContent =
                    'Correct answer!';
            } else {
                document.getElementById('feedback').textContent =
                    'Incorrect answer!';
            }

            // Disable all answer buttons
            document.querySelectorAll('#answers button')
                .forEach(btn => btn.disabled = true);
        };

        document.getElementById('answers').append(button);
    });
}

// Move to next question or display final score
document.getElementById('next').onclick = () => {

    if (!answered) {
        document.getElementById('feedback').textContent =
            'Please select an answer first!';
        return;
    }

    if (index < questions.length - 1) {
        index++;
        render();
    } else {
        document.getElementById('question').textContent =
            'Quiz Completed!';

        document.getElementById('answers').replaceChildren();

        document.getElementById('feedback').textContent =
            'You have completed all three questions!';

        document.getElementById('score').textContent =
            `Your final score: ${score} out of 3`;

        document.getElementById('next').hidden = true;
    }
};

// Start the quiz
render();
