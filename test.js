let resultAlert = document.querySelector('.result');
let restartButton = document.querySelector('button');
let valueBox = document.querySelectorAll('.box');
let array = ["","","","","","","","",""]

restartButton.addEventListener("click" , restart);
function restart(){setTimeout(function(){
    console.log('hello')
    array = ["","","","","","","","",""]
    valueBox.forEach(function(element){
        element.innerText = "";
    })
    resultAlert.innerText = `you will play with "o"`;
}, 600)}

function updateScreen(message){
    resultAlert.innerText = message;
}
// console.log(array[9]==0)
// updateScreen('hello')
// console.log(valueBox)
// console.log(Array.from(valueBox))
valueBox.forEach(function(element){
    element.addEventListener('click',valueFunction);
})

function valueFunction(event){
    // console.log("after computer fill",array);
    let userStatus = userFill(event.target);
    let comStatus=false;
    // console.log(userStatus);
    if(userStatus==false){
        comStatus = computerFill();
    }
    // console.log(comStatus)
    if(comStatus==false & userStatus==false){
        let k=0;
        array.forEach(function(ele){
            if(ele!="")
            k++;
        })
        if(k==9){
        console.log(k);
        updateScreen('Game draw');
        restart();
        }
    }
}

function userFill(element){
    // checkIfValid(array,element.id);
    array[Number(element.id)] = 'o';
    element.innerText = 'o';
    console.log("after user fill",array);
    let userStatus = checkIfWin(array);
    if(array[userStatus]=='o'){
        updateScreen("you have won");
        restart();
        return true;
    }
    else{
        return false;
    }
}

function checkIfWin(array){
    if(array[0]==array[1] & array[1]==array[2] & array[2]!="") return 2;
    else if(array[3]==array[4] & array[4]==array[5] & array[5]!="") return 5;
    else if(array[6]==array[7] & array[7]==array[8] & array[8]!="") return 8;
    else if(array[0]==array[3] & array[3]==array[6] & array[6]!="") return 6;
    else if(array[1]==array[4] & array[4]==array[7] & array[7]!="") return 7;
    else if(array[2]==array[5] & array[5]==array[8] & array[8]!="") return 8;
    else if(array[0]==array[4] & array[4]==array[8] & array[8]!="") return 8;
    else if(array[2]==array[4] & array[4]==array[6] & array[6]!="") return 6;
    else return 9;
}

function checkIfValid(array){
    array.forEach(function(element){

    })
}

function computerFill(){
    let comWinStatus = checkIfComputerCanWin();
    let userWinStaus;
    if(comWinStatus==false){
        userWinStaus = checkIfUserIsAboutToWin();
    }
    // console.log(status)
    if(comWinStatus==false & userWinStaus==false){
        for(i=0;i<9;i++){
            if(array[i]==""&array[i]!='o'){
                valueBox[i].innerText = 'x';
                array[i] = 'x';
                console.log("after computer fill",array);
                break;
            }
        }
        while(1){
            let i=Math.floor(Math.random()*100)%9;
            console.log(i);
            if(array[i]==""&array[i]!='o'){
                // valueBox[i].innerText = 'x';
                // array[i] = 'x';
                console.log("after computer fill",array,i);
                break;
            }
        }
    }
    return (comWinStatus);
}

function checkIfComputerCanWin(){
    let comStatus = comWinStatus();
    // console.log(status)
    if(comStatus>=0 & comStatus<9){
        array[comStatus] = 'x';
        valueBox[comStatus].innerText = 'x';
        updateScreen('computer have won')
        restart();
        return true;      //To be write a reset function
        // console.log("after computer fill win",array);
    }
    else{
        return false;
    }
}

function comWinStatus(){
    if(array[0]==array[1] & array[1]=="x" & array[2]=="") return 2;
    else if(array[0]==array[2] & array[2]=="x" & array[1]=="") return 1;
    else if(array[2]==array[1] & array[1]=="x" & array[0]=="") return 0;
    else if(array[3]==array[4] & array[4]=="x" & array[5]=="") return 5;
    else if(array[4]==array[5] & array[5]=="x" & array[3]=="") return 3;
    else if(array[3]==array[5] & array[5]=="x" & array[4]=="") return 4;
    else if(array[6]==array[7] & array[7]=="x" & array[8]=="") return 8;
    else if(array[6]==array[8] & array[8]=="x" & array[7]=="") return 7;
    else if(array[7]==array[8] & array[8]=="x" & array[6]=="") return 6;
    else if(array[0]==array[3] & array[3]=="x" & array[6]=="") return 6;
    else if(array[0]==array[6] & array[6]=="x" & array[3]=="") return 3;
    else if(array[3]==array[6] & array[6]=="x" & array[0]=="") return 0;
    else if(array[2]==array[5] & array[5]=="x" & array[8]=="") return 8;
    else if(array[2]==array[8] & array[8]=="x" & array[5]=="") return 5;
    else if(array[5]==array[8] & array[8]=="x" & array[2]=="") return 2;
    else if(array[4]==array[1] & array[1]=="x" & array[7]=="") return 7;
    else if(array[7]==array[1] & array[1]=="x" & array[4]=="") return 4;
    else if(array[7]==array[4] & array[4]=="x" & array[1]=="") return 1;
    else if(array[0]==array[4] & array[4]=="x" & array[8]=="") return 8;
    else if(array[0]==array[8] & array[8]=="x" & array[4]=="") return 4;
    else if(array[4]==array[8] & array[8]=="x" & array[0]=="") return 0;
    else if(array[2]==array[4] & array[4]=="x" & array[6]=="") return 6;
    else if(array[4]==array[6] & array[6]=="x" & array[2]=="") return 2;
    else if(array[2]==array[6] & array[6]=="x" & array[4]=="") return 4;
    else return 9;
}

function checkIfUserIsAboutToWin(){
    let status = userStatus();
    console.log("user win status checked",status)
    if(status<9 & status>=0){
        console.log("hello")
        array[status]='x';
        valueBox[status].innerText = 'x';
        return true;
    }
    else return false;
}

function userStatus(){
    if(array[0]==array[1] & array[1]=="o" & array[2]=="") return 2;
    else if(array[0]==array[2] & array[2]=="o" & array[1]=="") return 1;
    else if(array[2]==array[1] & array[1]=="o" & array[0]=="") return 0;
    else if(array[3]==array[4] & array[4]=="o" & array[5]=="") return 5;
    else if(array[4]==array[5] & array[5]=="o" & array[3]=="") return 3;
    else if(array[3]==array[5] & array[5]=="o" & array[4]=="") return 4;
    else if(array[6]==array[7] & array[7]=="o" & array[8]=="") return 8;
    else if(array[6]==array[8] & array[8]=="o" & array[7]=="") return 7;
    else if(array[7]==array[8] & array[8]=="o" & array[6]=="") return 6;
    else if(array[0]==array[3] & array[3]=="o" & array[6]=="") return 6;
    else if(array[0]==array[6] & array[6]=="o" & array[3]=="") return 3;
    else if(array[3]==array[6] & array[6]=="o" & array[0]=="") return 0;
    else if(array[2]==array[5] & array[5]=="o" & array[8]=="") return 8;
    else if(array[2]==array[8] & array[8]=="o" & array[5]=="") return 5;
    else if(array[5]==array[8] & array[8]=="o" & array[2]=="") return 2;
    else if(array[4]==array[1] & array[1]=="o" & array[7]=="") return 7;
    else if(array[7]==array[1] & array[1]=="o" & array[4]=="") return 4;
    else if(array[7]==array[4] & array[4]=="o" & array[1]=="") return 1;
    else if(array[0]==array[4] & array[4]=="o" & array[8]=="") return 8;
    else if(array[0]==array[8] & array[8]=="o" & array[4]=="") return 4;
    else if(array[4]==array[8] & array[8]=="o" & array[0]=="") return 0;
    else if(array[2]==array[4] & array[4]=="o" & array[6]=="") return 6;
    else if(array[4]==array[6] & array[6]=="o" & array[2]=="") return 2;
    else if(array[2]==array[6] & array[6]=="o" & array[4]=="") return 4;
    else return 9;
}