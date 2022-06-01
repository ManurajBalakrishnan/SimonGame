let gamePattern=[];
let userClickedPattern=[];
let butttonColors=["red","blue","green","yellow"];

let started=false;
let level=0;
let score=0;



//keypress 'a' to start the game 
$(document).keypress(function () { 
    
    if(!started)
    {
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
});

//handler function to know which button the user clicked..
$(".button").click(function()
{
    let userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);//pushing the userclickedpattern into the array
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
});

//checkAnswer
function checkAnswer(currentLevel)
{
    console.log(gamePattern[currentLevel]);
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success");
        
        if(userClickedPattern.length === gamePattern.length)
        {
            $(".score").text(`Score:${score=score+10}`);
            setTimeout(function(){
                nextSequence();
            },1000);
        }
        
    }
    else
    {
        let gameOver=new Audio("sounds/wrong.mp3");
        gameOver.play();
        $("body").addClass("game-over");
        setTimeout(function()
        {
            $("body").removeClass("game-over");
            $("#level-title").html("Game Over <br> Press any key to restart the game");
            //<br> press R to Restart
        },200);
        console.log("wrong");
        startOver();
    }
}

//random number
function nextSequence()
{
    userClickedPattern=[];
    level++;
    
    $("#level-title").text("Level " + level);//displaying the current level\
    $(".score").text(`Score:${score}`);
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour=butttonColors[randomNumber];//choose random color..
    gamePattern.push(randomChosenColour);

    //to animate flash in the button..using fadeto +callback\
    for(let i=0;i<gamePattern.length;i++)
    {
        setTimeout(function()
        {
            
            console.log(gamePattern[i]);
        },3000);
        
    }
    let randomButton=$("."+randomChosenColour);
    randomButton.fadeTo(100,0.2,function(){$(this).fadeTo(500,1.0);});
    playSound(randomChosenColour);
    
}

//playing Sound
function playSound(name)
{
    let audio=new Audio("sounds/" +name+ ".mp3");
    audio.play();
}

//animate button when it is clicked
function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function()
    {
        $("#"+currentColor).removeClass("pressed");
    },100);

}

//restart the game
function startOver()
{
    level=0;
    gamePattern=[];
    started=false;
    score=0;
}


