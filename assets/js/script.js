var questions = [
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
    question: "2. What does CSS mean?",
    answers: [
        "a: Coding System Sequencing",
        "b: Cascading Style Sheets",
        "c: Combat Service Support"
	],
    correctAnswer: "b: Cascading Style Sheets"
}, 
{
    question: "3. HTML uses ___?",
    answers: [
        "a: Fixed tags defined by the language",
        "b: Code",
        "c: Predfined Tags"
	],
    correctAnswer: "a: Fixed tags defined by the language"
}, 
{
    question: "4. What is the correct syntax for referring to an external script called ” abc.js",
    answers: [
        "a: <href =/assets/js/abc.js>",
        "b: <script src=” abc.js”>",
        "c: <script name=” abc.js”>"
	],
    correctAnswer: "b: <script src=” abc.js”>"
}, 
{
    question: "5. The property in CSS used to change the text color of an element is ____ ",
    answers: [
        "a: bgcolor",
        "b: text-color",
        "c: color"
	],
    correctAnswer: "c: color"
},
];

var score= 0;
var qindex= 0;


var countDown = document.querySelector("#countDown");
var timer = document.querySelector("#timerStart");
var questionsGroup = document.querySelector("#questionsGroup");
var box = document.querySelector("#box"); 


// timer rules
var timeLeft = 76;
var endQuiz = 0;
var penalty = 10;
var qCreate = document.createElement("ul");
	
// Triggers timer, displays on the screen
	timer.addEventListener("click", function () {
if (endQuiz === 0) {
	endQuiz = setInterval(function () {
	timeLeft--;
	countDown.textContent = "Time left: " + timeLeft;
	
if (timeLeft <= 0) {
	     clearInterval(endQuiz);
	     allDone();
         countDown.textContent = "Time's up!";
 	}
}, 1000);
}
	     render(qindex);
});

// questions and choices displayed 
function render(qindex) {
         questionsGroup.innerHTML = "";
         qCreate.innerHTML = "";

// loops questions
for (var i = 0; i < questions.length; i++) {
     var userQuestion = questions[qindex].question;
     var userChoices = questions[qindex].answers;
         questionsGroup.textContent = userQuestion;
}

// New for each for question choices
	     userChoices.forEach(function (newItem) {
     var listItem = document.createElement("li");
         listItem.textContent = newItem;
         questionsGroup.appendChild(qCreate);
         qCreate.appendChild(listItem);
         listItem.addEventListener("click", (compare));
    })
}

// Event to compare choices with answer
function compare(event) {
     var element = event.target;
if (element.matches("li")) {
     var createDiv = document.createElement("div");
         createDiv.setAttribute("id", "createDiv");
if (element.textContent == questions[qindex].correctAnswer) { 
	     score++;
         createDiv.textContent = "Correct!";
} else {
         timeLeft = timeLeft - penalty;
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
	     countDown.innerHTML = "";
 
// End of Quiz Heading:
	 var createH1 = document.createElement("h1");
	     createH1.setAttribute("id", "createH1");
	     createH1.textContent = "Good Job!"
 	     questionsGroup.appendChild(createH1);
 
 // creates paragraph
	 var createP = document.createElement("p");
	     createP.setAttribute("id", "createP");
    	 questionsGroup.appendChild(createP);
 
// Uses paragraph and tells you the score
if (timeLeft >= 0) {
	 var timeRemaining = timeLeft;
	 var createP2 = document.createElement("p");
		 clearInterval(holdInterval);
		 createP.textContent = "Your final score is: " + timeRemaining;
 		 questionsGroup.appendChild(createP2);
}
 
// creates a label and asks for initials
	 var createLabel = document.createElement("label");
	     createLabel.setAttribute("id", "createLabel");
	     createLabel.textContent = "Enter your initials: ";
 
	 questionsGroup.appendChild(createLabel);
 
// inputs intials
	 var createInput = document.createElement("input");
	     createInput.setAttribute("type", "text");
	     createInput.setAttribute("id", "initials");
	     createInput.textContent = "";
     	 questionsGroup.appendChild(createInput);
 
// submit button
	 var createSubmit = document.createElement("button");
	     createSubmit.setAttribute("type", "submit");
	     createSubmit.setAttribute("id", "Submit");
	     createSubmit.textContent = "Submit";
     	 questionsGroup.appendChild(createSubmit);
 
// Event listener to record initials and local storage for initials and score
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
