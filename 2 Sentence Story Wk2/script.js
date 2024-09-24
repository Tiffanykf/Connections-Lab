let button;
let baby;

button = document.getElementById('button');

button.addEventListener("click", function(){
    document.body.style.background = baby;
    baby.src = "baby.jpeg";
});

window.addEventListener('scroll', function(){
    console.log(window.scrollX);
    // document.body.style.background = "hsl(165, 100%, 75%)";
});