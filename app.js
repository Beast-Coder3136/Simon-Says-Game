let level = 0;
let gameSeq = [];
let userSeq = [];
let started = false;
let btns = ["red","yellow","green","blue"];
let maxscore = 0;
let body = document.querySelector("body");

let start = document.querySelector(".start");
let heading = document.querySelector("h2");
start.addEventListener("click", function (){
 if(started==false){
    
    if(start.innerText = "Retry") {
        start.innerHTML = "Start";
    }
    console.log("game started");
    started =true;
    setTimeout((levelUp),300);
    
 }
})
function levelUp(){
    userSeq=[];
    ++level; 
    heading.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    gameSeq.push(randColor);
    showSeq(gameSeq);

}

async function showSeq(seq){
    for(color of seq){
        let colorbtn = document.querySelector(`.${color}`);
        console.log(colorbtn)
        await delay(100)
        await gameFlash(colorbtn);
        await delay(250);
    }
}
function gameFlash(btn){
  return new Promise((resolve,reject)=>{
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash");
        resolve();
    },300);
    
  })

}
function delay(ms){
    return new Promise((resolve)=>{
        setTimeout(()=>{resolve()},ms);
    })
}

function userFlash(btn){

    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash");
    },250);

    
}
function btnPressed(){
    console.log(this)
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
        body.style.backgroundColor ="red"
        setTimeout(function (){
            body.style.backgroundColor = "#F1FAEE";
        },250)
        heading.innerHTML = `Game Over! <br>
        <b>Your score: ${level}, High Score: ${checkMaxscore()}</b>  <br> `;
        start.innerText = "Retry";
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

