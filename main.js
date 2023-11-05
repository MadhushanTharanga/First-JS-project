let level=1;
let min=0;
let sec=0;
let timeInterval=null;

const selectElement = document.getElementById('level-select');
const secElement = document.getElementById('sec');
const minElement = document.getElementById('min');

selectElement.addEventListener("change",function(){
    console.log(selectElement.value);
});

const start=()=>{
    manageTime();
}
const manageTime=()=>{
    min=0;
    sec=0;

    secElement.textContent='00';
    minElement.textContent='00';
    clearInterval(timeInterval);

    timeInterval=setInterval(()=>{
       sec++;

       if (sec<10) {
        secElement.textContent='0'+sec;
       }
       else{
        secElement.textContent=sec+'';
       }
       if (sec==60) {
        sec=0;
        min++;
        minElement.textContent='0'+min;
       }
       if (min==3) {
        min=0;
       }

    },1000);
}