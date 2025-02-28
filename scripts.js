//onclick button
function greet1() {
   alert ("Welcome to my webpage enjoy!!");
    
}

//onclick button to tell users that the message was received
function greet2() {
    alert ("Message Sent");
     
 }

// email validation
function validateEmail(email) {
    return email.includes('@') && email.includes('.');
}
    let response = validateEmail("sampleemail@gmail.com");
    console.log(response);


//used to store email for faster user input
localStorage.setItem("email","exampleemail@gmail.com");
console.log(localStorage.getItem("email"));

//countdown form
const counterFormArea = document.querySelector('.form-area');
const counterForm = document.getElementById('counter-form');
const counterEl = document.getElementById('counter');

const counterTitleEl = document.getElementById('counter-title');
const timeElements = document.querySelectorAll('span');
const counterResetBtn = document.getElementById('counter-reset');

const complete = document.getElementById('complete');
const completeInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

const datePicker = document.getElementById('counter-date');

let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

let title = '';
let date = '';

let today = new Date ().toISOString ().split('T')[0];
console.log (today);

datePicker.setAttribute('min',today);

function updateDom () {

    countdownActive = setInterval(()=>{
    let now = new Date ().getTime ();
    let distance = countdownValue - now;
    // console.log (distance);

    //calculates days, hours, minutes, seconds
    const days = Math.floor(distance/day);
    const hours = Math.floor(distance % day/hour);
    const minutes = Math.floor(distance % hour/minute);
    const seconds = Math.floor(distance % minute/second);
    console.log (days, hours, minutes, seconds);

    if (distance < 0) {
        counterEl.hidden = true;
        counterFormArea.hidden = true;
        complete.hidden = false;
         clearInterval(countdownActive);
        completeInfo.textContent = 'Lehigh Valley Auto Show';
    } else {

        //location of time elements for countdown
    timeElements[1].textContent = days;
    timeElements[2].textContent = hours;
    timeElements[3].textContent = minutes;
    timeElements[4].textContent = seconds;
    counterTitleEl.textContent = title;
    counterFormArea.hidden = true;
    counterEl.hidden = false;
    }

},1000);
}

function updateCountdown (e){
    e.preventDefault ();
    title = e.srcElement[0].value;
     date = e.srcElement[1].value;

     const savedCountdown = {
       title:title, 
       date:date
     };

     localStorage.setItem('countdown',JSON.stringify(savedCountdown));


     console.log (title, date);
     if (date === '') {
     alert ('Please enter a date!');
 }else{
     countdownValue = new Date (date).getTime ();
     console.log (countdownValue);
     updateDom ();
    }
 }

function reset() {
    localStorage.removeItem ('countdown');
    counterEl.hidden = true;
    complete.hidden = true;
    clearInterval(countdownActive);
    title = '';
    date = '';
    counterFormArea.hidden = false;
}

function restoreCountdown(){
if(localStorage.getItem('countdown')){
  counterFormArea.hidden = true; 
  let countdownData = JSON.parse(localStorage.getItem('countdown'))
  title = countdownData.title;
   date = countdownData.date;
   countdownValue = new Date (date).getTime ();
   updateDom();
}
}
 
counterForm.addEventListener ('submit', updateCountdown);
counterResetBtn.addEventListener ('click', reset);
    completeBtn.addEventListener ('click', reset);

restoreCountdown ();
