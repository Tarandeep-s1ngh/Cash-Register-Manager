
const billAmt = document.querySelector("#billAmt");
const cashRecieved = document.querySelector("#cashRecieved");

const errorDiv = document.querySelector(".errorMsg");

const cashRecievedDiv = document.querySelector(".cashRecieved");
const balanceDiv = document.querySelector(".balance");

const output= document.querySelector("#output");

const nextBtn = document.querySelector("#nextBtn");
const checkBtn = document.querySelector("#checkBtn");

const noOfNotes= document.querySelectorAll(".noOfNotes");

const arrayNoteAmt = [2000, 500, 100, 20, 10, 5, 1];

nextBtn.addEventListener('click', ()=>{
    hideError();
    if(Number(billAmt.value)>0){

        nextBtn.style.display = "none";
        cashRecievedDiv.style.display = "block";
    }
    else{
        showError("Enter valid bill amount");
    }
} )

checkBtn.addEventListener('click', ()=>{
    clearNoOfNotes();
    hideError();
    let billAmtValue= Number(billAmt.value);
    let cashRecievedValue= Number(cashRecieved.value);

    if(billAmtValue>0 && cashRecievedValue>0){

        if(!Number.isInteger(cashRecievedValue)){
            showError("Enter valid amount in cash recieved field");
            return;
        }
        if(billAmtValue > cashRecievedValue){
            showError("Cash recieved is less than bill, please collect more cash");
            return;
        }
        calculateNotes(billAmtValue, cashRecievedValue);
    } else{
        showError("Enter valid bill amount and cash recieved to continue");
        }
})

function calculateNotes(bill, cash){
    let returnAmt = cash-bill;
    
    if(returnAmt<1){
        showError("Even-steven! No amount should be returned");
        return;
    }
    balanceDiv.style.display = "block";

    for(let i=0; i<arrayNoteAmt.length; i++){
        returnAmt= compare(returnAmt, arrayNoteAmt[i], i);
    }
    
}

function compare(remainder, noteAmt, index){

    if(remainder >= noteAmt){
        let notes = Math.floor(remainder/noteAmt);
        remainder = remainder - notes*noteAmt;
        noOfNotes[index].innerText = `${notes}`;
    }
    return remainder
}

function clearNoOfNotes(){
    for(let notes of noOfNotes){
        notes.innerText = "";
    }
}

function showError(text){
    errorDiv.style.display = "block";
    errorDiv.innerText= text;
    balanceDiv.style.display = "none";
}

function hideError(){
    errorDiv.style.display = "none";
}
