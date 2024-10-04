// Global variables
let genreData;
let storyData;
let genres = [];
let stories = [];
let lastPressed = '';
let answer;
let music;
let prompt1, prompt2;
let lastPressed2;
let answer2;
let storyElement;
let uName;
let input;
let enter;
let title;
let user;
let fave;
let motto;
let player;
let pHeader;
let instrumentsArray;
let randomNumber;
let playerElement;
let strum = document.querySelector('#audio')

window.addEventListener('load', function() {
    console.log('page is loaded');

    fetch('https://binaryjazz.us/wp-json/genrenator/v1/genre/5')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        genreData = data;
        createGenreButtons();
    });

    fetch('https://binaryjazz.us/wp-json/genrenator/v1/story/5')
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        storyData = data;
    })

    fetch('./play.json')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.instruments);
        instrumentsArray = data.instruments;
        randomNumber = Math.floor(Math.random()*instrumentsArray.length)
        playerElement = data.instruments[randomNumber];
    })

    .catch(error => {
        console.log("Error! :" + error);
    });
});

// Setup function for p5.js
function setup() {
    let myCanvas = createCanvas(windowWidth * 0.8, 2200);
    myCanvas.parent("data_container");
    background(54,185,228);

    prompt1 = createElement('h3', "Choose the music genre you've been loving lately");
    prompt1.class('bodyFont');
    prompt1.position(width * 0.2, 150);

    music = createElement('h3', "I'm totally into:");
    music.class('bodyFont');
    music.position(width * 0.2, 615);
}

// Create buttons for genres
function createGenreButtons() {
    for (let i = 0; i < genreData.length; i++) {
        let genreName = genreData[i];
        genres[i] = new genreButton(width * 0.6, 170 + i * 75, genreName);
        genres[i].display();
    }
}

// Create buttons for stories
function createStoryButtons() {
    for (let i = 0; i < storyData.length; i++) {
        let storyName = storyData[i];
        stories[i] = new storyButton(width * 0.6, 740 + i * 85, storyName);
        stories[i].display();
    }
}

function collectUserInfo(){
    input = createInput();
    input.position(width*.6, 1370);
    uName = createElement('h3', "What's your name?");
    uName.position(width*.4, 1350);
    uName.class('instFont');
    enter = createButton("submit");
    enter.position(width*.83, 1377);
    enter.class('userButton');
    enter.mousePressed(() => createUserProfile());
}

function createUserProfile(){
    strum.play();
    pHeader = createElement('h3', "But Have You Heard? Profile");
    pHeader.position(width*.2, 1575);
    pHeader.class('uProfile');
    title = input.value();
    user = createElement('h3', `Name: ${title}`);
    user.position(width*.2, 1650);
    user.class('uProfile');
    fave = createElement('h3', `Fave Genre: ${answer}`)
    fave.position(width*.2, 1725);
    fave.class('uProfile');
    player = createElement('h3', `Thinks music should be heard via: ${playerElement}`);
    player.position(width*.2, 1800);
    player.class('uProfile');
    motto = createElement('h3', `Life Motto: ${answer2}`);
    motto.position(width*.2, 1950);
    motto.class('uProfile');
    let w = width/15;
    for (x=0; x<width; x+=w){
      circle(width*.5, 1725, x);
      fill(124,204,225, 60);
      noStroke();
    }
    let m = width/5;
    for (x=0; x<width; x+=m){
        circle(width*.5, 1700, x);
        fill(5,147,195,40);
        noStroke();
      }
}

// Class for genre buttons
class genreButton {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
    display() {
        this.button = createButton(this.name);
        this.button.position(this.x, this.y);
        this.button.class('genreButton');
        this.button.parent("data_container");
        this.button.mousePressed(() => this.buttonPressed());
    }
    buttonPressed() {
        lastPressed = this.name;
        answer = lastPressed;
        music.html(`I'm totally into: ${lastPressed}!`);
        music.class('answerFont');
        // strum.play();

        if (!prompt2) {
            createStoryButtons();
            prompt2 = createElement('h3', "What's the first thing you tell everyone you meet?");
            prompt2.position(width * 0.2, 705);
            prompt2.class('bodyFont');
        }
    }
}

// Class for story buttons
class storyButton {
    constructor(x, y, name) {
        this.x = x;
        this.y = y;
        this.name = name;
    }
    display() {
        this.button = createButton(this.name);
        this.button.position(this.x, this.y);
        this.button.class('storyButton');
        this.button.parent("data_container");
        this.button.mousePressed(() => this.buttonPressed());
    }
    buttonPressed() {
        lastPressed2 = this.name;
        answer2 = lastPressed2;
        collectUserInfo();

        // If storyElement already exists, update its content
        if (storyElement) {
            storyElement.html(`${lastPressed2}`);
        } else {
            // Create a new story element if it doesn't exist
            storyElement = createElement('h3', `${lastPressed2}`);
            storyElement.position(width * 0.2, 1220);
            storyElement.class('answerFont');
        }
        
        console.log(answer2);
    }
}

// Handle window resizing
function windowResized() {
    resizeCanvas(windowWidth * 0.8, 2000);
    background(54,185,228);
    
    // Update positions of prompts and other elements
    prompt1.position(width * 0.2, 150);
    music.position(width * 0.2, 615);

    if (prompt2) {
        prompt2.position(width * 0.2, 705);
    }

    if (storyElement){
        storyElement.position(width * 0.15, 1220);
    }

    if (input){
        input.position(width*.6, 1370);
    }

    if (uName){
        uName.position(width*.4, 1350);
    }

    if (enter){
        enter.position(width*.83, 1377);
    }

    // Clear and recreate buttons for genres
    for (let i = 0; i < genres.length; i++) {
        genres[i].button.remove(); // Remove old button
    }
    createGenreButtons();

    // Clear and recreate buttons for stories
    for (let i = 0; i < stories.length; i++) {
        stories[i].button.remove(); // Remove old button
    }
    if (answer) {
        createStoryButtons();
    }
}
