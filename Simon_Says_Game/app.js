let userSeq=[];
let gameSeq=[];
let started = false;
let level=0;
let highScore=0;
let btns = ["red","green","orange","blue"];
let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");
// h3.innerHTML = "High Score :: <b>0</b>";
document.addEventListener("keypress",function(){
    if(started==false)
        {
            console.log("game started");
            started=true;
            levelUp();
        }
})

function levelUp()
{
    userSeq=[];
    level++;
    h2.innerText = `Level:${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randColor=btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    // console.log(randBtn);
    gameSeq.push(randColor);
    gameFlash(randBtn);
    
}

function gameFlash(btn)
{
    btn.classList.add("gameFlash");
    setTimeout(function(){
        btn.classList.remove("gameFlash");
    },250);
}

function userFlash(btn)
{
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function checkIdx(idx)
{
    if(userSeq[idx]==gameSeq[idx]){
        if(userSeq.length==gameSeq.length)
            {
                setTimeout(levelUp,1000);
            }
    }
    else{
        h2.innerHTML=`Game Over!! Your Score is <b>${level}<b> <br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },150);
        reset();
    }
}

let allbtns = document.querySelectorAll(".btn");
for(btn of allbtns)
{
    btn.addEventListener("click",function(){
        userbtn = this;
        // console.log(this);
        userFlash(userbtn);
        userSeq.push(userbtn.getAttribute("id"));
        checkIdx(userSeq.length-1);
    })
}

function reset()
{
    started = false;
    userSeq=[];
    gameSeq=[];
    highScore = Math.max(highScore,level);
    h3.innerHTML=`High Score :: <b>${highScore}</b>`;
    level=0;
}

