let button;
let baby;

button = document.getElementById('openDoor');
console.log(button);

baby = document.getElementById('baby');
console.log(baby);

babyContainer = document.getElementById('img_container');
console.log(babyContainer);

button.addEventListener("click", function(){
    document.body.style.background = baby;
    document.getElementById('img_container').style.
    baby.src = "./Baby.jpeg";
    
    // change the style of the container
});

window.addEventListener('scroll', function(){
    console.log(window.scrollX);

    // Get the total height of the document
    const documentWidth = document.body.scrollWidth - window.innerWidth;

    // Calculate the opacity value (between 0 and 1) based on scroll position
    const opacity = Math.min(scrollX / documentWidth, 1);

    // Set the background color based on scroll position (fading to black)
    document.body.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
});