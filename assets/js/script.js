let questions = [
{
    question: "1. What does is HTML mean?",
    answers: [
        "a: HyperText Markup Language",
        "b: Happy time movie lines",
        "c: HyperTime Muddy Loops"
	],
        correctAnswer: "a: HyperText Markup Language",
		
}, 
{
    question: "2. How to empty an array in JavaScript?",
    answers: [
        "a: ",
        "b: ",
        "c: "
	],
    correctAnswer: ""
}, 
{
    question: "3. What function to add an element at the begining of an array and one at the end?",
    answers: [
        "a: ",
        "b: ",
        "c: "
	],
    correctAnswer: ""
}, 
{
    question: "4. What will this output? var a = [1, 2, 3]; console.log(a[6]);",
    answers: [
        "a: ",
        "b: ",
        "c: "
	],
    correctAnswer: ""
}, 
{
    question: "5. What would following code return? console.log(typeof typeof 1);",
    answers: [
        "a: ",
        "b: ",
        "c: "
	],
    correctAnswer: ""
},
];

let score= 0;
let qindex= 0;


let countdown = document.querySelector("#countdown");
let timer = document.querySelector("#start");
let questionsGroup = document.querySelector("#questionsGroup");
let box = document.querySelector("#box"); 
{
    // timer rules
	let timeLeft = 76;
	let holdPeriod = 0;
	let penalty = 10;
	let qCreate = document.createElement("ul");
	
	// Triggers timer, displays on the screen
	timer.addEventListener("click", function () {
		if (holdPeriod === 0) {
			holdPeriod = setInterval(function () {
				timeLeft--;
				currentTime.textContent = "Countdown: " + timeLeft;
	
				if (timeLeft <= 0) {
					clearInterval(holdPeriod);
					allDone();
					currentTime.textContent = "Time's up!";
				}
			}, 1000);
		}
		render(qindex);
	});

// questions and choices displayed 
function render(qindex) {
    questionsGroup.innerHTML = "";
    choicesList.innerHTML = "";

    // loops questions
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[qindex].question;
        var userChoices = questions[qindex].answers;
        questionsGroup.textContent = userQuestion;
    }

// New for each for question choices
	 userChoices.forEach(function (newItem) {
        let listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsGroup.appendChild(qCreate);
        qCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}

// Event to compare choices with answer
function compare(event) {
    let element = event.target;

    if (element.matches("li")) {

        let createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
            if (element.textContent == questions[questionIndex].correctAnswer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[qindex].correctAnswer;
        } else {
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[qindex].correctAnswer;
        }

    }
	
	 // Question Index determines number question user is on
	 qindex++;

	 if (qindex >= questions.length) {
		 allDone();
		 createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
	 } else {
		 render(qindex);
	 }
	 questionsGroup.appendChild(createDiv);
 
 }
 // All done will append last page
 function allDone() {
	 questionsGroup.innerHTML = "";
	 countdown.innerHTML = "";
 
	 // Heading:
	 let createH1 = document.createElement("h1");
	 createH1.setAttribute("id", "createH1");
	 createH1.textContent = "All Done!"
 	 questionsGroup.appendChild(createH1);
 
	 // Paragraph
	 let createP = document.createElement("p");
	 createP.setAttribute("id", "createP");
 
	 questionsGroup.appendChild(createP);
 
	 // Calculates time remaining and replaces it with score
	 if (secondsLeft >= 0) {
		 let timeRemaining = secondsLeft;
		 let createP2 = document.createElement("p");
		 clearInterval(holdInterval);
		 createP.textContent = "Your final score is: " + timeRemaining;
 		 questionsGroup.appendChild(createP2);
	 }
 
	 // Label
	 let createLabel = document.createElement("label");
	 createLabel.setAttribute("id", "createLabel");
	 createLabel.textContent = "Enter your initials: ";
 
	 questionsGroup.appendChild(createLabel);
 
	 // input
	 let createInput = document.createElement("input");
	 createInput.setAttribute("type", "text");
	 createInput.setAttribute("id", "initials");
	 createInput.textContent = "";
 
	 questionsGroup.appendChild(createInput);
 
	 // submit
	 let createSubmit = document.createElement("button");
	 createSubmit.setAttribute("type", "submit");
	 createSubmit.setAttribute("id", "Submit");
	 createSubmit.textContent = "Submit";
 
	 questionsGroup.appendChild(createSubmit);
 
	 // Event listener to capture initials and local storage for initials and score
	 createSubmit.addEventListener("click", function () {
		 var initials = createInput.value;
 
		 if (initials === null) {
 
			 console.log("No value entered!");
 
		 } else {
			 var finalScore = {
				 initials: initials,
				 score: timeRemaining
			 }
			 console.log(finalScore);
			 var allScores = localStorage.getItem("allScores");
			 if (allScores === null) {
				 allScores = [];
			 } else {
				 allScores = JSON.parse(allScores);
			 }
			 allScores.push(finalScore);
			 var newScore = JSON.stringify(allScores);
			 localStorage.setItem("allScores", newScore);
			 // Travels to final page
			 window.location.replace("./highscores.html");
		 }
	 });
 
 }
 
} 