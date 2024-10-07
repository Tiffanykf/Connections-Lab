window.addEventListener('load', function(){
    console.log('page is loaded');
    //Request 5 new genres from the genrenator
    fetch('https://binaryjazz.us/wp-json/genrenator/v1/genre/5')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        //Assign to global variable to access in p5

        genreData = data;

        for (let i = 0; i < genreData.length; i++) {
            let genreName = genreData[i];
            genres[i] = new genreButton(50, 150 + i*50, genreName);
        }

        //Assign variables to each genre generated. I know it's cleaner to do with an array but I'll come back to clean that up.
        // let genre1 = document.getElementById('genres_1');
        // genre1.innerHTML = genreData[0];
        // let genre2 = document.getElementById('genres_2');
        // genre2.innerHTML = genreData[1];
        // let genre3 = document.getElementById('genres_3');
        // genre3.innerHTML = genreData[2];
        // let genre4 = document.getElementById('genres_4');
        // genre4.innerHTML = genreData[3];
        // let genre5 = document.getElementById('genres_5');
        // genre5.innerHTML = genreData[4];
    })
    //Request 5 new stories from the genrenator
    fetch('https://binaryjazz.us/wp-json/genrenator/v1/story/5')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        //Assign to global variable to access in p5
        storyData = data;

        for (let i = 0; i < storyData.length; i++) {
            let storyName = storyData[i];
            stories[i] = new storyButton(275, 150 + i*50, storyName);
        }


        // for (let i = 0; i < storyData.length; i++) {
        //     let storyName = storyData[i];
        //     stories[i] = new Ellipse(i, storyName);
        // }

        //Assign variables to each story generated
        // let story1 = document.getElementById('story_1');
        // story1.innerHTML = data[0];
        // let story2 = document.getElementById('story_2');
        // story2.innerHTML = data[1];
        // let story3 = document.getElementById('story_3');
        // story3.innerHTML = data[2];
        // let story4 = document.getElementById('story_4');
        // story4.innerHTML = data[3];
        // let story5 = document.getElementById('story_5');
        // story5.innerHTML = data[4];
    })
    // fetch('play.json')
    // .then(function(response){
    //     return response.json();
    // })
    // .then(function(data){
    //     console.log(data.instruments);

    //     let instrumentsArray = data.instruments;
    //     let randomNumber = Math.floor(Math.random()*instrumentsArray.length)
    //     let playerElement = document.getElementById('player');
    //     playerElement.innerHTML = data.instruments[randomNumber];
    // })
    .catch(error => {
        console.log("Error! :" + error);
        })      
})

//p5 CODE//

//Global variables
let genreData;
let storyData;
let genres = [];
let stories = [];
let button;
let lastPressed = '';
let lastPressed2 = '';
let answer;
let answer2;
let music; 

function setup() {
    let myCanvas = createCanvas(800, 400);
    background(144, 238, 144);

    myCanvas.parent("data_container");

    prompt1 = createElement('h2', 'Choose the music genre you love lately!');
    prompt1.position(20, 75);
}

function draw(){
    if (genreData) {
        for (let i = 0; i < genreData.length; i++) {
            //Display buttons
            genres[i].display();
          }
        } else {
          console.log("Data is not ready yet!");
        }

        music = createElement('h2', 'I totally love:');
        music.position(20, 400);
    //    music = text(`I totally love:`, 20, 400);

if (answer){
    for (let i = 0; i < storyData.length; i++) {
        //Display buttons
        stories[i].display();

      }
      prompt1.remove();
      prompt2 = createElement('h2', 'And the first thing you tell everyone you meet:');
      prompt2.position(250, 75);
}

    }

    class genreButton {
        constructor(x, y, name) {
          this.x = x;   
          this.y = y;
          this.name = name;
        }
        display() {
          this.button = createButton(this.name);
          this.button.position(this.x, this.y);
          this.button.mousePressed(() => this.buttonPressed());
        }
        buttonPressed(){
            lastPressed = this.name;
            answer = lastPressed;
            music.html(`I totally love: ${lastPressed}!`);
        }
    }

    class storyButton {
        constructor(x, y, name) {
          this.x = x;   
          this.y = y;
          this.name = name;
        }
        display() {
          this.button = createButton(this.name);
          this.button.position(this.x, this.y);
          this.button.mousePressed(() => this.buttonPressed());
        }
        buttonPressed(){
            lastPressed2 = this.name;
            answer2 = lastPressed2;
            console.log(answer2);
        }
    }

  