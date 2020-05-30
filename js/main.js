
let mode = document.querySelector('#mode');
let radio = document.getElementsByName('g')
let resultAlert = document.querySelector('.popdisplay p');
let resultAlertPop = document.querySelector('.overlay');
let resultButton = document.querySelector('.popdisplay button')
let restartButton = document.querySelector('.Rbtn');
let valueBox = document.querySelectorAll('.box');
let array = ["", "", "", "", "", "", "", "", ""];
let resultDisplay = document.querySelectorAll('.disresult')
let p1 = 0;
let p2 = 0;
let draw = 0;
let modevaluedefault = 'medium';
let x = 'x';
let o = 'o';
let k = 0;
let player1 = resultDisplay[0]
let player2 = resultDisplay[1]
// console.log(radio);
// mode.addEventListener('select',function(){
//     console.log(mode.value)        
// })
// let a=10;
// console.log(resultDisplay[0].innerHTML = "player-1 won : <p>0</p>")
// option = document.querySelector('#mode')
// console.log(option)
// option.addEventListener('change',(event)=>{
//     console.log(event.target.value);
// })


//------------>>chechbox value
for (i = 0; i < 2; i++) {
    radio[i].addEventListener("click", function () {
        if (radio[0].checked) {
            o = 'o';
            x = 'x';
        }
        else {
            o = 'x';
            x = 'o';
        }
        // console.log(o, x);
    })
    // console.log(o, x);
}

//--------->>> reset values

restartButton.addEventListener("click", function () {
    resetValue(0, 0, 0);
})
function resetValue(a, b, c) {
    array = ["", "", "", "", "", "", "", "", ""]
    valueBox.forEach(function (element) {
        element.innerText = "";
    })
    k = 0;
    p1 = a;
    p2 = b;
    draw = c;
    winDisplayUpdate(p1, p2, draw);
}

//---------->>win display

function winDisplayUpdate(p1, p2, draw) {
    resultDisplay[0].children[0].innerText = p1;
    resultDisplay[1].children[0].innerText = p2;
    resultDisplay[2].children[0].innerText = draw;
}


//---------->> choose mode function


mode.addEventListener("change", function () {
    // console.log(mode.value);
    if (mode.value == "friend") {
        player1.innerHTML = "Player-1 won : <p>0</p>"
        player2.innerHTML = "Player-2 won : <p>0</p>"
    }
    else {
        player1.innerHTML = "You won : <p>0</p>"
        player2.innerHTML = "Computer won : <p>0</p>"
    }
    // console.log("modechanged")
    resetValue(0, 0, 0);
    // else game(modevalue);
})

valueBox.forEach(function (element) {
    element.addEventListener('click', function (event) {
        if (mode.value == "medium") {
            mediumgame(event);
        }
        else if (mode.value == "easy") {
            easygame(event);
        }
        else if (mode.value == "impossible") {
            impossiblegame(event);
        }
        else if (mode.value == "friend") {
            // resultDisplay[0].innerHTML = "player-1 won : <p>0</p>";
            // resultDisplay[1].innerHTML = "player-2 won : <p>0</p>";
            playwithfriend(event);
        }
    });
})



//----------->> restart function


function restart() {
    setTimeout(function () {
        resultAlertPop.style.display = "block";
        resultButton.addEventListener("click", function () {
            resultAlertPop.style.display = "none";
            resetValue(p1, p2, draw);
        })
        // console.log('hello')
        // resultAlert.innerText = `you will play with "o"`;
    }, 600)
}


function updateScreen(message) {
    resultAlert.innerText = message;
}
// console.log(array[9]==0)
// updateScreen('hello')
// console.log(valueBox)
// console.log(Array.from(valueBox))

//------------->>medum level 
function mediumgame(event) {
    let ele = event.target;
    // console.log("medium");
    // let validSatatus=false;
    // console.log(checkIfValid(ele.id))
    if (checkIfValid(ele.id)) {
        array[ele.id] = 'o';
        ele.innerText = o;
        validSatatus = true;
        // console.log("before win check" , array);
        // console.log(checkIfWin(array));
        if (array[checkIfWin(array)] == 'o') {
            updateScreen("you have won");
            p1 = p1 + 1;
            restart();
            return;
        }
    }
    else return;
    if (midComFill()) {  // impoComfill always true
        if (array[checkIfWin(array)] == 'x') {
            updateScreen("computer have won");
            p2 = p2 + 1;
            restart();
            return;
        }
    }
    else return;
    let i = 0;
    for (i = 0; i < 9; i++) {
        if (array[i] == "")
            break;
    }
    if (i == 9) {
        updateScreen("game draw");
        draw = draw + 1;
        restart();
        return;
    }
}


function midComFill() {
    // if (array[4] == "") {
    //     array[4] = 'x';
    //     valueBox[4].innerText = x;
    //     return true;
    // }
    let temp = comWinStatus(array);
    if (temp >= 0 && temp < 9) {
        array[temp] = 'x';
        valueBox[temp].innerText = x;
        return true;
    }
    temp = userStatus(array)
    if (temp >= 0 && temp < 9) {
        array[temp] = 'x';
        valueBox[temp].innerText = x;
        return true;
    }
    let i = 0;
    // console.log(i, "medium lst");
    let randumvalue = randomNumber();
    for (i = 0; i < 9; i++) {
        if (array[randumvalue[i]] == "") {
            array[randumvalue[i]] = 'x';
            valueBox[randumvalue[i]].innerText = x;
            return true;
        }
    }
    return true;
}

// common logic

function checkIfWin(array) {
    if (array[0] == array[1] & array[1] == array[2] & array[2] != "") return 2;
    else if (array[3] == array[4] & array[4] == array[5] & array[5] != "") return 5;
    else if (array[6] == array[7] & array[7] == array[8] & array[8] != "") return 8;
    else if (array[0] == array[3] & array[3] == array[6] & array[6] != "") return 6;
    else if (array[1] == array[4] & array[4] == array[7] & array[7] != "") return 7;
    else if (array[2] == array[5] & array[5] == array[8] & array[8] != "") return 8;
    else if (array[0] == array[4] & array[4] == array[8] & array[8] != "") return 8;
    else if (array[2] == array[4] & array[4] == array[6] & array[6] != "") return 6;
    else return 9;
}

function comWinStatus() {
    if (array[0] == array[1] & array[1] == "x" & array[2] == "") return 2;
    else if (array[0] == array[2] & array[2] == "x" & array[1] == "") return 1;
    else if (array[2] == array[1] & array[1] == "x" & array[0] == "") return 0;
    else if (array[3] == array[4] & array[4] == "x" & array[5] == "") return 5;
    else if (array[4] == array[5] & array[5] == "x" & array[3] == "") return 3;
    else if (array[3] == array[5] & array[5] == "x" & array[4] == "") return 4;
    else if (array[6] == array[7] & array[7] == "x" & array[8] == "") return 8;
    else if (array[6] == array[8] & array[8] == "x" & array[7] == "") return 7;
    else if (array[7] == array[8] & array[8] == "x" & array[6] == "") return 6;
    else if (array[0] == array[3] & array[3] == "x" & array[6] == "") return 6;
    else if (array[0] == array[6] & array[6] == "x" & array[3] == "") return 3;
    else if (array[3] == array[6] & array[6] == "x" & array[0] == "") return 0;
    else if (array[2] == array[5] & array[5] == "x" & array[8] == "") return 8;
    else if (array[2] == array[8] & array[8] == "x" & array[5] == "") return 5;
    else if (array[5] == array[8] & array[8] == "x" & array[2] == "") return 2;
    else if (array[4] == array[1] & array[1] == "x" & array[7] == "") return 7;
    else if (array[7] == array[1] & array[1] == "x" & array[4] == "") return 4;
    else if (array[7] == array[4] & array[4] == "x" & array[1] == "") return 1;
    else if (array[0] == array[4] & array[4] == "x" & array[8] == "") return 8;
    else if (array[0] == array[8] & array[8] == "x" & array[4] == "") return 4;
    else if (array[4] == array[8] & array[8] == "x" & array[0] == "") return 0;
    else if (array[2] == array[4] & array[4] == "x" & array[6] == "") return 6;
    else if (array[4] == array[6] & array[6] == "x" & array[2] == "") return 2;
    else if (array[2] == array[6] & array[6] == "x" & array[4] == "") return 4;
    else return 9;
}

function checkIfUserIsAboutToWin() {
    let status = userStatus();
    console.log("user win status checked", status)
    if (status < 9 & status >= 0) {
        console.log("hello")
        array[status] = 'x';
        valueBox[status].innerText = x;
        return true;
    }
    else return false;
}

function userStatus() {
    if (array[0] == array[1] & array[1] == "o" & array[2] == "") return 2;
    else if (array[0] == array[2] & array[2] == "o" & array[1] == "") return 1;
    else if (array[2] == array[1] & array[1] == "o" & array[0] == "") return 0;
    else if (array[3] == array[4] & array[4] == "o" & array[5] == "") return 5;
    else if (array[4] == array[5] & array[5] == "o" & array[3] == "") return 3;
    else if (array[3] == array[5] & array[5] == "o" & array[4] == "") return 4;
    else if (array[6] == array[7] & array[7] == "o" & array[8] == "") return 8;
    else if (array[6] == array[8] & array[8] == "o" & array[7] == "") return 7;
    else if (array[7] == array[8] & array[8] == "o" & array[6] == "") return 6;
    else if (array[0] == array[3] & array[3] == "o" & array[6] == "") return 6;
    else if (array[0] == array[6] & array[6] == "o" & array[3] == "") return 3;
    else if (array[3] == array[6] & array[6] == "o" & array[0] == "") return 0;
    else if (array[2] == array[5] & array[5] == "o" & array[8] == "") return 8;
    else if (array[2] == array[8] & array[8] == "o" & array[5] == "") return 5;
    else if (array[5] == array[8] & array[8] == "o" & array[2] == "") return 2;
    else if (array[4] == array[1] & array[1] == "o" & array[7] == "") return 7;
    else if (array[7] == array[1] & array[1] == "o" & array[4] == "") return 4;
    else if (array[7] == array[4] & array[4] == "o" & array[1] == "") return 1;
    else if (array[0] == array[4] & array[4] == "o" & array[8] == "") return 8;
    else if (array[0] == array[8] & array[8] == "o" & array[4] == "") return 4;
    else if (array[4] == array[8] & array[8] == "o" & array[0] == "") return 0;
    else if (array[2] == array[4] & array[4] == "o" & array[6] == "") return 6;
    else if (array[4] == array[6] & array[6] == "o" & array[2] == "") return 2;
    else if (array[2] == array[6] & array[6] == "o" & array[4] == "") return 4;
    else return 9;
}



// easy level function

function easygame(event) {
    let ele = event.target;
    // console.log("easy");
    let validSatatus = false;
    // console.log(checkIfValid(ele.id))
    if (checkIfValid(ele.id)) {
        array[ele.id] = 'o';
        ele.innerText = o;
        validSatatus = true;
        // console.log("before win check" , array);
        // console.log(checkIfWin(array));
        if (array[checkIfWin(array)] == 'o') {
            updateScreen("you have won");
            p1 = p1 + 1;
            restart();
            return;
        }
    }
    else return;
    if (validSatatus) {
        easyComputerFill();
        if (array[checkIfWin(array)] == 'x') {
            updateScreen("computer have won");
            p2 = p2 + 1;
            restart();
            return;
        }
    }
    if (validSatatus) {
        let i = 0;
        for (i = 0; i < 9; i++) {
            if (array[i] == "")
                break;
        }
        if (i == 9) {
            updateScreen("game draw");
            draw = draw + 1;
            restart();
            return;
        }

    }
}

function checkIfValid(index) {
    if (array[index] == "")
        return true;
    else return false;
}


function easyComputerFill() {
    // console.log("computer fills")
    // console.log("before fill",array)
    let randumvalue = randomNumber();
    for (i = 0; i < 9; i++) {
        if (array[randumvalue[i]] == "") {
            array[randumvalue[i]] = 'x';
            valueBox[randumvalue[i]].innerText = x;
            break;
        }
    }
    // console.log("after fill",array)
}


//---------->>impossible mode

function impossiblegame(event) {
    let ele = event.target;
    // console.log("impossible");
    // let validSatatus=false;
    // console.log(checkIfValid(ele.id))
    if (checkIfValid(ele.id)) {
        array[ele.id] = 'o';
        ele.innerText = o;
        validSatatus = true;
        // console.log("before win check" , array);
        // console.log(checkIfWin(array));
        if (array[checkIfWin(array)] == 'o') {
            updateScreen("you have won");
            p1 = p1 + 1;
            restart();
            return;
        }
    }
    else return;
    if (impoComFill()) {  // impoComfill always true
        if (array[checkIfWin(array)] == 'x') {
            updateScreen("computer have won");
            p2 = p2 + 1;
            restart();
            return;
        }
    }
    else return;
    let i = 0;
    for (i = 0; i < 9; i++) {
        if (array[i] == "")
            break;
    }
    if (i == 9) {
        updateScreen("game draw");
        draw = draw + 1;
        restart();
        return;
    }
}

function impoComFill() {
    if (array[4] == "") {
        array[4] = 'x';
        valueBox[4].innerText = x;
        return true;
    }
    let i=0;
    for(i=0;i<9;i++){
        if(i==4)
        continue;
        if(array[i]!="")
        break;
    }
    if(i==9){
        let rand = 4;
        while (rand == 4) {
            let rand = (Math.floor(Math.random() * 100) % 5) * 2;
            if (rand != 4) {
                array[rand] = 'x';
                valueBox[rand].innerText = x;
                return true;
            }
        }
    }
    let temp = comWinStatus(array);
    if (temp >= 0 && temp < 9) {
        array[temp] = 'x';
        valueBox[temp].innerText = x;
        return true;
    }
    temp = userStatus(array)
    if (temp >= 0 && temp < 9) {
        array[temp] = 'x';
        valueBox[temp].innerText = x;
        return true;
    }
    randumvalue = randomNumber();
    for (i = 0; i < 9; i++) {
        // console.log(array)
        if (array[randumvalue[i]] == "") {
            array[randumvalue[i]] = 'x';
            let z = vusercheck(array);
            // console.log(z, "hello")
            if (z) {
                valueBox[randumvalue[i]].innerText = x;
                return true;
            }
            else array[randumvalue[i]] = "";
        }
    }
    // console.log(array)
    // console.log("last function")
    randumvalue = randomNumber();
    for (i = 0; i < 9; i++) {
        if (array[randumvalue[i]] == "") {
            array[randumvalue[i]] = 'x';
            let y = comWinStatus(array);
            // console.log(y);
            if (y < 9) {
                array[y] = 'o';
                // console.log(vUserCheckWin(array))
                if(vUserCheckWin(array)<2){
                    array[y] = "";
                    valueBox[randumvalue[i]].innerText = x;
                    // console.log(array);
                    return true;
                }
                else{
                    array[randumvalue[i]] = "";
                    array[y] = "";
                }
            }
            else array[randumvalue[i]] = "";
        }
    }
    return true;
}
// vusercheck1 se ham chahte hai ki wh batai ki kaha uder ka 1 ya 0 banega
function vusercheck(array) {
    // console.log("vuser")
    // const temp = array;
    let i = 0;
    for (i = 0; i < 9; i++) {
        if (array[i] == "") {
            array[i] = 'o';
            // console.log(array, vUserCheckWin(array))
            if (vUserCheckWin(array) >= 2) {
                array[i] = "";
                return false;
            }
            array[i] = "";
        }
    }
    return true;    //true ka matlab hai ki waha par chal sakte hai
}

function vUserCheckWin(array) {
    let blank = 0;
    if (array[0] == 'o' && array[1] == 'o' && array[2] == "") blank++;
    if (array[0] == 'o' && array[2] == 'o' && array[1] == "") blank++;
    if (array[2] == 'o' && array[1] == 'o' && array[0] == "") blank++;
    if (array[3] == 'o' && array[4] == 'o' && array[5] == "") blank++;
    if (array[4] == 'o' && array[5] == 'o' && array[3] == "") blank++;
    if (array[3] == 'o' && array[5] == 'o' && array[4] == "") blank++;
    if (array[6] == 'o' && array[7] == 'o' && array[8] == "") blank++;
    if (array[6] == 'o' && array[8] == 'o' && array[7] == "") blank++;
    if (array[7] == 'o' && array[8] == 'o' && array[6] == "") blank++;
    if (array[0] == 'o' && array[3] == 'o' && array[6] == "") blank++;
    if (array[0] == 'o' && array[6] == 'o' && array[3] == "") blank++;
    if (array[3] == 'o' && array[6] == 'o' && array[0] == "") blank++;
    if (array[2] == 'o' && array[5] == 'o' && array[8] == "") blank++;
    if (array[2] == 'o' && array[8] == 'o' && array[5] == "") blank++;
    if (array[5] == 'o' && array[8] == 'o' && array[2] == "") blank++;
    if (array[4] == 'o' && array[1] == 'o' && array[7] == "") blank++;
    if (array[7] == 'o' && array[1] == 'o' && array[4] == "") blank++;
    if (array[7] == 'o' && array[4] == 'o' && array[1] == "") blank++;
    if (array[0] == 'o' && array[4] == 'o' && array[8] == "") blank++;
    if (array[0] == 'o' && array[8] == 'o' && array[4] == "") blank++;
    if (array[4] == 'o' && array[8] == 'o' && array[0] == "") blank++;
    if (array[2] == 'o' && array[4] == 'o' && array[6] == "") blank++;
    if (array[4] == 'o' && array[6] == 'o' && array[2] == "") blank++;
    if (array[2] == 'o' && array[6] == 'o' && array[4] == "") blank++;
    return blank;
}

//-------->> play with a friend

function playwithfriend(event) {
    let ele = event.target;
    // console.log("friend");
    let validSatatus = false;
    // console.log(checkIfValid(ele.id))
    if (checkIfValid(ele.id) && k % 2 == 0) {
        k++;
        array[ele.id] = 'o';
        ele.innerText = o;
        // validSatatus = true;
        // console.log("before win check" , array);
        // console.log(checkIfWin(array));
        if (array[checkIfWin(array)] == 'o') {
            k = 0;
            updateScreen("player-1 have won");
            p1 = p1 + 1;
            restart();
            return;
        }
    }
    if (checkIfValid(ele.id) && k % 2 != 0) {
        k++;
        array[ele.id] = 'x';
        ele.innerText = x;
        // validSatatus = true;
        // console.log("before win check" , array);
        // console.log(checkIfWin(array));
        if (array[checkIfWin(array)] == 'x') {
            k = 0;
            updateScreen("player-2 have won");
            p2 = p2 + 1;
            restart();
            return;
        }
    }
    else {
        let i = 0;
        for (i = 0; i < 9; i++) {
            if (array[i] == "")
                break;
        }
        if (i == 9) {
            updateScreen("game draw");
            draw = draw + 1;
            restart();
            return;
        }
        return;
    }
}

function randomNumber(){
let randomarray = ['','','','','','','','',''];
let number = ['0','1','2','3','4','5','6','7','8']
let t=0;
while(t<9){
    let rand = Math.floor(Math.random()*100)%9;
    if(randomarray[rand]==""){
        randomarray[rand] = number[t];
        t = t+1;
    }
}
return randomarray;
}
