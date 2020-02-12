let aray = [];
let z = 0;
let y = 9;
 

let x = Math.ceil(Math.random()*100+1);

let chance = document.querySelector('.chance');
let guess = document.querySelector('.guess');
let hilow = document.querySelector('.hilow');
let answer = document.querySelector('.enter');
let submit = document.querySelector('.button');
let wintext = document.querySelector('.wintext');

console.log(x);

submit.addEventListener('click',function(){

    let a = Number(answer.value);
    if(a===x){
        wintext.textContent='Correct . You have won.';
        wintext.style.backgroundColor='green';
        gameoverwin();
    }
    else{
        if(z===0){
            guess.textContent='Previous guessesd : ';
        }
        if(a<x){
            aray.push(a);
            answer.value='';  
            console.log(aray[z]);
            hilow.textContent='Go higher.';
            chance.textContent='chance left: '
            chance.textContent+=' '+y;
        }
        if(a>x){
            aray.push(a);
            answer.value='';  
            console.log(aray[z]);
            hilow.textContent='Go lower.';
            chance.textContent='chance left: '
            chance.textContent+=' '+y;
        }
        guess.textContent+=' '+String(aray[z]);
        z++;
        y--;
        answer.focus();
        
    }
    if(y<0){
        wintext.textContent='you have lose. The answer is : ';
        wintext.textContent+=x;
        wintext.style.backgroundColor='red';
        gameoverlose();

    }
})

function gameoverwin(){
    submit.disabled = true;
    answer.disabled = true;
    let win = document.querySelector('.bu');
    let bb = document.createElement('button');
    bb.textContent='Get Reward';  
    win.appendChild(bb);
    bb.addEventListener('click',Reward);
    let again = document.querySelector('.tryagain') ;
    let ag = document.createElement('button');
    ag.textContent='Play again';
    again.appendChild(ag);
    ag.addEventListener('click',reset);
}



function gameoverlose(){
    submit.disabled = true;
    answer.disabled = true;
    let again = document.querySelector('.tryagain') ;
    let ag = document.createElement('button');
    ag.textContent='Play again';
    again.appendChild(ag);
    ag.addEventListener('click',reset);
}

function reset(){
  location.reload();
}

function Reward(){
    window.open("https://www.youtube.com/watch?v=TNHsw8TLf6Y");
}