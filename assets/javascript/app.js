function quizQuestion(question, choices, correctAnswer){
  this.question = question;
  this.choices = choices;
  this.correctAnswer = correctAnswer;
}
  
var allQuestions = [

  new quizQuestion("Which show is based out of KPBS San Diego?",["Wait Wait Dont Tell Me", "The A1", "A Way With Words", "Radiolab"],2),
  new quizQuestion("Forum airs on which station?",["KCCW Los Angeles", "KNOW Minneapolis", "WBEZ Chicago", "KQED San Francisco"],3),
  new quizQuestion("What is the longest running show?",["Fresh Air", "This American Life", "All Things Considered", "Weekend Edition"],2),
  new quizQuestion("Approximately how many stations broadcasts NPR today?",["200", "500", "800", "1000"],3),
  new quizQuestion("What year was NPR founded?",["1971", "1953", "1980", "1965"],0),
  new quizQuestion("Which of these was NOT a working title for Morning Edition?",["First Things First", "First Take", "Morning Air", "Starting Line"],1), 
];


var currentQuestion = 0;
var correctAnswers = 0;

function setupOptions() {
  $('#question').html(parseInt(currentQuestion) + 1 + ". " + allQuestions[currentQuestion].question);
  var options = allQuestions[currentQuestion].choices;
  var formHtml = '';
  for (var i = 0; i < options.length; i++) {
    formHtml += '<div><input type="radio" name="option" value="' + i + '" class="options"><label for="option' + i + '">' + options[i] + '</label></div><br/>';
  }
  $('#form').html(formHtml);
  $(".options:eq(0)").prop('checked', true);
}

function checkAns() {
  if ($("input[name=option]:checked").val() == allQuestions[currentQuestion].correctAnswer) {
    correctAnswers++;
  }
}

$(document).ready(function(){
	
  var $jumbotron = $(".jumbotron");
  var $start = $("#start");
  var $next = $("#next");
  var $result = $("#result");
  
	$jumbotron.hide();
	$start.click(function() {
	    $jumbotron.fadeIn();
      $(this).hide();

    });
    
    setupOptions();

    var timeleft = 30;
    var downloadTimer = setInterval(function(){
    $("#timeLeft").text(timeleft + " seconds remaining");
    timeleft -= 1;
    if(timeleft <= 0){
    clearInterval(downloadTimer);
    $("timeLeft").text("Finished");
  }
}, 1000);



	$next.click(function(){
			event.preventDefault();
			checkAns();
			currentQuestion++;
			if(currentQuestion<allQuestions.length){
				setupOptions();
				if(currentQuestion==allQuestions.length-1){
					$next.html("Submit");
					$next.click(function(){
            timeleft= 0; 
						$jumbotron.hide();
						$result.html("You correctly answered " + correctAnswers + " out of " + currentQuestion + " questions! ").hide();
						$result.fadeIn(1500);
					});
				}
      }
    })
});
