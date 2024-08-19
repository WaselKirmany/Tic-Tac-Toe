let boxes=document.querySelectorAll(".box");
let reset=document.querySelector(".reset");
let newGame=document.querySelector("#newgame");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let count=0;
let draw=true;
const winPatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

//Click Boxes and Call CheckWinner Func
boxes.forEach((box)=>{//Defn Each Box
    box.addEventListener("click",()=>{//Defn What Code Does For Each Box On Click
        if (count%2==0){ //Check X or O
            box.classList.add("X");
            box.innerText="X";
        }
        else{
            box.classList.add("O");
            box.innerText="O";
        }
        count++; //Inc. Count
        box.disabled=true; //Disable Box on Click
        checkWinner(); //Check Winner
        showDraw(); //Check Draw
    })
});

//Check Winner and Print
const checkWinner=()=>{
    winPatterns.forEach((pattern)=>{
        //check box content at given posn for each pattern
        //eg. for pattern 0 1 2: box[0], box[1], box[2] get checked
        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1!="" && pos2!="" && pos3!=""){ //checking whether boxes are non empty
            if(pos1===pos2 && pos2==pos3){//checking whether boxes are equal
                draw=false; //Game is Not Draw
                showWinner(pos1); //Show Winner Func Called
                disableBoxes(); //Disable Boxes Func Called
            }
        }
        
    })
};

//Func To Show Draw
const showDraw=()=>{
    if(count==9 && draw==true){//Draw if all boxes are filled and no one matches a pattern
        msg.innerText="Game is Draw"; //Edit Text
        msgContainer.classList.remove("hide"); //Show Mssg
        reset.classList.add("hide"); //Hide Reset Button
    }
};

//Func Show Winner and New Game Opt
const showWinner=(winner)=>{
    msg.innerText=`Congratulations! Winner is ${winner}.`; //Edit Text
    msgContainer.classList.remove("hide"); //Show Mssg
    reset.classList.add("hide"); //Hide Reset Button
};

//Func Disable All Boxes=> Game End
const disableBoxes=()=>{
    boxes.forEach((box)=>{//loop
        box.disabled=true;//disable all boxes
    });
}

//Func Enable All Boxes=> Game Start
const enableBoxes=()=>{
    boxes.forEach((box)=>{//loop 
        box.disabled=false; //enable all boxes
        box.innerText=""; //reset box content
        box.classList.remove("X");
        box.classList.remove("O");
    });
}

//Func Reset or New Game
const resetGame=()=>{
        enableBoxes(); //enabling all boxes again
        count=0; //reseting count to 0
        draw=true; //reseting draw value
        msgContainer.classList.add("hide"); //hide mssg
        reset.classList.remove("hide"); //reappear Reset Button
};

reset.addEventListener("click",resetGame);  //Click Reset Button
newGame.addEventListener("click",resetGame); //Click New Game Button