function getButtonsByTextContent(textContent){
    let buttons = [];
    if( (!Number.isNaN(+textContent) || "`~-_=+/\\".includes(textContent)) && (textContent != " ")){
        for(let btn of document.getElementsByClassName("keyboard-button")){
            if(btn.childElementCount == 2){
                if(btn.childNodes[0].textContent == textContent || btn.childNodes[1].textContent == textContent){
                    buttons.push(btn);
                }
            }
        }
    }
    else{
        if(textContent.includes("arrow")){
            let arrowBtn = document.getElementsByClassName(textContent.replace(" ", "-"))[0];
            buttons.push(arrowBtn);
        }
        else{
            for(let btn of document.getElementsByClassName("keyboard-button")){
                if(btn.textContent == textContent){
                    buttons.push(btn);
                }
            }
        }
    }
    if(buttons.length > 1){
        return buttons;
    }
    else{
        if(buttons){
            return buttons[0];
        }
        else{
            return -1;
        }
    }
}

function getProperKey(eKey){
    switch(eKey){
        case "Backspace":
            return "backspace";
        case "Tab":
            return "tab";
        case "Delete":
            return "del";
        case "CapsLock":
            return "caps lock";
        case "Enter":
            return "enter";
        case "Shift":
            return "shift";
        case "Control":
            return "ctrl";
        case "Meta":
            return "win";
        case "Alt":
            return "alt";
        case "ArrowLeft":
            return "arrow left";
        case "ArrowUp":
            return "arrow up";
        case "ArrowRight":
            return "arrow right";
        case "ArrowDown":
            return "arrow down";
        default:
            return eKey;
    }
}

function doBackSpace(){
    let textarea = document.getElementsByTagName("textarea")[0];
    let txt = textarea.value;
    let delPos = textarea.selectionStart;
    if(delPos){
        textarea.value = txt.slice(0, delPos - 1) + txt.slice(delPos);
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = delPos - 1;
    }
    else{
        textarea.focus();
    }
}

function doTab(){
    let textarea = document.getElementsByTagName("textarea")[0];
    let txt = textarea.value;
    let curPos = textarea.selectionStart;
    textarea.value = txt.slice(0, curPos) + "\t" + txt.slice(curPos);
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = curPos + 1;
}

function doDel(){
    let textarea = document.getElementsByTagName("textarea")[0];
    let txt = textarea.value;
    let delPos = textarea.selectionStart;
    textarea.value = txt.slice(0, delPos) + txt.slice(delPos + 1);
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = delPos;
}

function doEnter(){
    let textarea = document.getElementsByTagName("textarea")[0];
    let txt = textarea.value;
    let curPos = textarea.selectionStart;
    textarea.value = txt.slice(0, curPos) + "\n" + txt.slice(curPos);
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = curPos + 1;
}

function doCapsLock(){
    if(getButtonsByTextContent("caps lock").id == "to_lowercase"){
        for(let btn of document.getElementsByClassName("keyboard-button")){
            if(btn.textContent.length == 1){
                btn.textContent = btn.textContent.toUpperCase();
            }
        }
        getButtonsByTextContent("caps lock").id = "to_uppercase";
    }
    else{
        for(let btn of document.getElementsByClassName("keyboard-button")){
            if(btn.textContent.length == 1){
                btn.textContent = btn.textContent.toLowerCase();
            }
        }
        getButtonsByTextContent("caps lock").id = "to_lowercase";
    }
}

function doShiftDown(){
    for(let btn of document.getElementsByClassName("keyboard-button")){
        if(btn.textContent.length == 1){
            btn.textContent = btn.textContent.toUpperCase();
        }
    }
}

function doShiftUp(){
    for(let btn of document.getElementsByClassName("keyboard-button")){
        if(btn.textContent.length == 1){
            btn.textContent = btn.textContent.toLowerCase();
        }
    }
}

function doCtrl(){
    let textarea = document.getElementsByTagName("textarea")[0];
    let curPos = textarea.selectionStart;
    textarea.focus();
    textarea.selectionStart = curPos;
}

function doAlt(){
    doCtrl();
}

function doWin(){
    doCtrl();
}

function doLeftArrow(){
    let textarea = document.getElementsByTagName("textarea")[0];
    textarea.focus();
    if(textarea.selectionStart){
        textarea.selectionStart -= 1;
        textarea.selectionEnd -= 1;
    }
}

function doUpDownArrow(){
    let textarea = document.getElementsByTagName("textarea")[0];
    let pos = textarea.selectionStart;
    textarea.focus();
    textarea.selectionStart = pos;
}

function doRightArrow(){
    let textarea = document.getElementsByTagName("textarea")[0];
    textarea.focus();
    textarea.selectionStart += 1;
}

function doLetter(btn){
    let textarea = document.getElementsByTagName("textarea")[0];
    let txt = textarea.value;
    let curPos = textarea.selectionStart;
    textarea.value = txt.slice(0, curPos) + btn.textContent + txt.slice(curPos);
    textarea.focus();
    textarea.selectionStart = textarea.selectionEnd = curPos + 1;
}

function doKeyboardShiftedDown(){
    event.preventDefault();
    let letterList = "abcdefghijklmnopqrstuvwxyz";
    letterList += letterList.toUpperCase();
    if(letterList.includes(event.key)){
        let textarea = document.getElementsByTagName("textarea")[0];
        let text = textarea.value;
        let curPos = textarea.selectionStart;
        textarea.value = text.slice(0, curPos) + event.key + text.slice(curPos);
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = curPos + 1
    }
    document.body.onkeydown = realKeyboardDown;
}

function changeLang(){
}




function loadKeyboard(){
    function createKeyboardRow(width){
        let kbRow = document.createElement("div");
        kbRow.setAttribute("class", "keyboard-row");
        kbRow.style.width = width;
        return kbRow;
    }


    let keyboard = document.createElement("div");
    keyboard.setAttribute("class", "keyboard");

    let symbols = [
        [["~", "`"], ["!", "1"], ["@", "2"], ["#", "3"], ["$", "4"], ["%", "5"], [":", "6"], ["?", "7"], ["*", "8"], ["(", "9"], [")", "0"], ["_", "-"], ["+", "="], "backspace"],
        ["tab", ...("qwertyuiop[]".split("")), ["/", "\\"], "del"],
        ["caps lock", ...("asdfghjkl;'".split("")), "enter"],
        ["shift", "\\", ...("zxcvbnm,./".split("")), "assets/images/arrow-up.svg", "shift"],
        ["ctrl", "win", "alt", " ", "alt", "ctrl", "assets/images/arrow-left.svg", "assets/images/arrow-down.svg", "assets/images/arrow-right.svg"]
    ];
    let btnLengths = [
        Array.from(new Array(13), x => "50px").concat(["110px"]),
        ["65px"].concat(Array(13).fill("50px")).concat(["60px"]),
        ["110px"].concat(Array(11).fill("50px")).concat(["90px"]),
        ["110px"].concat(Array(13).fill("50px")),
        ["70px", "50px", "50px", "400px", "50px", "70px"].concat(Array(3).fill("50px"))
    ];

    for(let i = 0; i < 5; i++){
        let currentKbrow = createKeyboardRow("100%");
        for(let j = 0; j < symbols[i].length; j++){
            loadButton(symbols[i][j], btnLengths[i][j], currentKbrow);
        }
        keyboard.appendChild(currentKbrow);
    }

    document.getElementById("container").appendChild(keyboard);
}



function loadButton(symbol, width, keyboardRow){
    let newButton = document.createElement("button");
    newButton.style.width = width;
    newButton.setAttribute("class", "keyboard-button");
    
    if(typeof symbol == "object"){
        newButton.onclick = () => {
            let textarea = document.getElementsByTagName("textarea")[0];
            let txt = textarea.value;
            let curPos = textarea.selectionStart;
            textarea.value = txt.slice(0, curPos) + symbol[1] + txt.slice(curPos);
            textarea.focus();
            textarea.selectionStart = curPos + 1;
        }
        let btnsymb = document.createElement("span");
        btnsymb.setAttribute("class", "btnsymb");
        let btnsymb2 = document.createElement("span");
        btnsymb2.setAttribute("class", "btnsymb-2");
        btnsymb2.textContent = symbol[0];
        btnsymb.textContent = symbol[1];
        newButton.appendChild(btnsymb2);
        newButton.appendChild(btnsymb);
    }
    else{
        if(symbol.slice(-3) == "svg"){
            newButton.style.backgroundImage = "url('" + symbol + "')";
            newButton.style.backgroundRepeat = "no-repeat";
            newButton.style.backgroundSize = "50% 50%";
            newButton.style.backgroundPosition = "center center";
            if(symbol.includes("left")){
                newButton.setAttribute("class", "arrow-left");
                newButton.onclick = doLeftArrow;
            }
            else{
                if(symbol.includes("right")){
                    newButton.setAttribute("class", "arrow-right");
                    newButton.onclick = doRightArrow;
                }
                else{
                    if(symbol.includes("up")){
                        newButton.setAttribute("class", "arrow-up");
                    }
                    else{
                        newButton.setAttribute("class", "arrow-down");
                    }
                    newButton.onclick = doUpDownArrow;
                }
            }
        }
        else{
            switch(symbol){
                case "backspace":
                    newButton.onclick = doBackSpace;
                    break;
                case "caps lock":
                    newButton.id = "to_lowercase";
                    newButton.onclick = doCapsLock;
                    break;
                case "tab":
                    newButton.onclick = doTab;
                    break;
                case "del":
                    newButton.onclick = doDel;
                    break;
                case "enter":
                    newButton.onclick = doEnter;
                    break;
                case "shift":
                    newButton.onmousedown = doShiftDown;
                    newButton.onmouseup = doShiftUp;
                    break;
                case "ctrl":
                    newButton.onclick = doCtrl;
                    break;
                case "alt":
                    newButton.onclick = doAlt;
                    break;
                case "win":
                    newButton.onclick = doWin;
                    break;
                default:
                    newButton.onclick = () => {
                        doLetter(newButton);
                    }
                    break;
            }
            let btnsymb = document.createElement("span");
            btnsymb.setAttribute("class", "btnsymb");
            btnsymb.textContent = symbol;
            newButton.appendChild(btnsymb);
        }
    }
    keyboardRow.appendChild(newButton);
}


function loadTextarea(){
    let textarea = document.createElement("textarea");
    document.getElementById("container").appendChild(textarea);
}


loadKeyboard();
loadTextarea();

let pressedButtons = [];
let tempStyle;



function realKeyboardDown(){
    function insertSymbol(symbol){
        let textarea = document.getElementsByTagName("textarea")[0];
        let curPos = textarea.selectionStart;
        let text = textarea.value;
        if(text){
            textarea.value = text.slice(0, curPos) + symbol + text.slice(curPos);
        }
        else{
            textarea.value = symbol;
        }
        textarea.focus();
        textarea.selectionStart = curPos + 1;
        textarea.selectionEnd = curPos + 1;
    }
    event.preventDefault();

    let eventKey = getProperKey(event.key);
    if(eventKey.length == 1){
        if(getButtonsByTextContent("caps lock").id == "to_uppercase"){
            eventKey = eventKey.toUpperCase();
        }
        else{
            eventKey = eventKey.toLowerCase();
        }
    }

    let letters = "abcdefghijklmnopqrstuvwxyz";
    letters += letters.toUpperCase() + "1234567890[];',./ \\`~-_=+";
    
    if(letters.includes(event.key)){
        if(getButtonsByTextContent("caps lock").id == "to_uppercase"){
            insertSymbol(event.key.toUpperCase());
        }
        else{
            insertSymbol(event.key.toLowerCase());
        }
    }
    else{
        if(event.key == "Shift"){
            document.body.onkeydown = doKeyboardShiftedDown;
            doShiftDown();
        }
    }

    let buttons = getButtonsByTextContent(eventKey);
    let curBtn;
    if(Array.isArray(buttons)){
        curBtn = event.code.includes("Left") ? buttons[0] : buttons[1];
    }
    else{
        curBtn = buttons;
    }
    tempStyle = curBtn.style;
    curBtn.style.transition = "border-radius 0.05s";
    curBtn.style.borderRadius = "25px";
    curBtn.style.backgroundColor = "rgb(40, 220, 75)";
    pressedButtons.push(curBtn);
}

function realKeyboardUp(){
    for(let btn of pressedButtons){
        btn.style.transition = "border-radius 0.05s";
        btn.style.borderRadius = "2px";
        btn.style.backgroundColor = "rgb(180, 180, 180)";
        let width = btn.style.width;
        btn.style = tempStyle;
        btn.style.width = width;
        switch(btn.className){
            case "arrow-left":
                btn.style.backgroundImage = "url(assets/images/arrow-left.svg)";
                break;
            case "arrow-up":
                btn.style.backgroundImage = "url(assets/images/arrow-up.svg)";
                break;
            case "arrow-right":
                btn.style.backgroundImage = "url(assets/images/arrow-right.svg)";
                break;
            case "arrow-down":
                btn.style.backgroundImage = "url(assets/images/arrow-down.svg)";
                break;
            default:
        }
    }
    switch(pressedButtons.length){
        case 1:
            if(pressedButtons[0].className.includes("arrow")){
                switch(pressedButtons[0].className.slice(6)){
                    case "left":
                        doLeftArrow();
                        break;
                    case "right":
                        doRightArrow();
                        break;
                    default:
                        doUpDownArrow();
                        break;
                }
            }
            else{
                let btnText = pressedButtons[0].textContent.toLowerCase();
                switch(btnText){
                    case "backspace":
                        doBackSpace();
                        break;
                    case "tab":
                        doTab();
                        break;
                    case "del":
                        doDel();
                        break;
                    case "caps lock":
                        doCapsLock();
                        break;
                    case "enter":
                        doEnter();
                        break;
                    case "shift":
                        document.body.onkeydown = realKeyboardDown;
                        doShiftUp();
                        break;
                    case "ctrl":
                        doCtrl();
                        break;
                    default:
                }
            }
            break;
        default:
            break;
    }
    pressedButtons.length = 0;
}

document.body.onkeydown = realKeyboardDown;
document.body.onkeyup = realKeyboardUp;
let textarea = document.getElementsByTagName("textarea")[0];