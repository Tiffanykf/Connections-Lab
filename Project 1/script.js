window.addEventListener('load', function(){
    console.log('page is loaded');
    fetch('https://binaryjazz.us/wp-json/genrenator/v1/genre/5')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        let genre1 = document.getElementById('genres_1');
        genre1.innerHTML = data[0];
        let genre2 = document.getElementById('genres_2');
        genre2.innerHTML = data[1];
        let genre3 = document.getElementById('genres_3');
        genre3.innerHTML = data[2];
        let genre4 = document.getElementById('genres_4');
        genre4.innerHTML = data[3];
        let genre5 = document.getElementById('genres_5');
        genre5.innerHTML = data[4];
    })
    fetch('https://binaryjazz.us/wp-json/genrenator/v1/story/5')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        let story1 = document.getElementById('story_1');
        story1.innerHTML = data[0];
        let story2 = document.getElementById('story_2');
        story2.innerHTML = data[1];
        let story3 = document.getElementById('story_3');
        story3.innerHTML = data[2];
        let story4 = document.getElementById('story_4');
        story4.innerHTML = data[3];
        let story5 = document.getElementById('story_5');
        story5.innerHTML = data[4];
    })
    fetch('play.json')
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data.instruments);
        let instrumentsArray = data.instruments;
        let randomNumber = Math.floor(Math.random()*instrumentsArray.length)
        let playerElement = document.getElementById('player');
        playerElement.innerHTML = data.instruments[randomNumber];
    })
    // .catch(error => {
    //     Console.log("Error! :" + error);
    //     })
        
})