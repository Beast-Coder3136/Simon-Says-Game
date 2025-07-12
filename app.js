let level = 0;
let gameSeq = [];
let userSeq = [];
let started = false;
let btns = ["red","yellow","green","blue"];
let maxscore = 0;

let body = document.querySelector("body");
let heading = document.querySelector("h2");
body.addEventListener("keypress", function (){
 if(started==false){
    console.log("game started");
    started =true;
    levelUp();
 }
})
function levelUp(){
    userSeq=[];
    ++level; 
    heading.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    gameFlash(randbtn);
}
function gameFlash(btn){

    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
    },250);
    
}

function userFlash(btn){

    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    },250);

    
}
function btnPressed(){
    let btn = this;
    userFlash(btn);
    let userColor = btn.classList[1];
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

function checkAns(idx){
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length){
            console.log("level cleared");
            setTimeout(levelUp,1000);
        }
    }
    else{
        console.log("Game over");
        checkMaxscore();
        body.style.backgroundColor ="red"
        setTimeout(function (){
            body.style.backgroundColor = "#F1FAEE";
        },250)
        heading.innerHTML = `Game Over! <br>
        <b>Your score: ${level}, High Score: ${checkMaxscore()}</b>  <br> 
        Press any key to retry`;
       reset();
    }

}
function checkMaxscore(){
    if(maxscore<=level){
        maxscore=level;

    }
    return maxscore;
}

function reset(){
    started =false;
    level = 0;
    gameSeq =[];
    userSeq = [];
    
}

let Allbtns = document.querySelectorAll(".box");
for(btn of Allbtns){
    btn.addEventListener("click",btnPressed)
}

