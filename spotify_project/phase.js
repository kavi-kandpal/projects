console.log("welcome to spotify");
let songindex=0;
let audio=new Audio('music/1.mp3');
let masterplay=document.getElementById('masterplay');
let myprogress=document.getElementById('progress');
let gif=document.getElementById('gif');
let songs=[
    
    {songname:"1.mp3" ,filepath: "music/1.mp3"},
    {songname:"2.mp3" ,filepath: "music/2.mp3"},
    {songname:"3.mp3" ,filepath: "music/3.mp3"},
    {songname:"4.mp3" ,filepath: "music/4.mp3"},
    {songname:"5.mp3" ,filepath: "music/5.mp3"},
    {songname:"6.mp3" ,filepath: "music/6.mp3"},
    {songname:"7.mp3" ,filepath: "music/7.mp3"},
    {songname:"8.mp3" ,filepath: "music/8.mp3"},
    {songname:"9.mp3" ,filepath: "music/9.mp3"},

]
  
  masterplay.addEventListener('click',()=>{
    masterplay.addEventListener('click', () => {
        if (audio.paused || audio.currentTime <= 0) {
            audio.play();
            masterplay.classList.remove('fa-play-circle');
            masterplay.classList.add('fa-pause-circle');
            gif.style.opacity=1;
        } 
        else {
            audio.pause();
            masterplay.classList.remove('fa-pause-circle');
            masterplay.classList.add('fa-play-circle');
            gif.style.opacity=0;

        }
    });
  })
audio.addEventListener('timeupdate', () => {
    let currentProgress = (audio.currentTime / audio.duration) * 100;
    myprogress.value = currentProgress;
});

myprogress.addEventListener('input', () => {
    let seekTime = (myprogress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
});

const play = () => {
    Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    });
};
Array.from(document.getElementsByClassName('songplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        play(); 
        // Get the index of the clicked song based on its id
        songindex = parseInt(e.target.id);

        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');

        // Change the audio source dynamically based on the index
        audio.src = `music/${songindex}.mp3`;

        // Reset audio time and play the new song
        audio.currentTime = 0;
        audio.play();

        // Update master play button to pause
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    });
});
document.getElementById("next").addEventListener("click",()=>{
    if(songindex>=9){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audio.src = `music/${songindex}.mp3`;

    // Reset audio time and play the new song
    audio.currentTime = 0;
    audio.play();

    // Update master play button to pause
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
});
document.getElementById("back",()=>{
    if(songindex==1){
        songindex=9;
    }
    else{
        songindex-=1;
    }
    audio.src = `music/${songindex}.mp3`;

    // Reset audio time and play the new song
    audio.currentTime = 0;
    audio.play();

    // Update master play button to pause
    masterplay.classList.remove('fa-play-circle');
    masterplay.classList.add('fa-pause-circle');
});




// Fast forward function
const forward = () => {
    // Ensure that the audio doesn't go beyond its duration
    if (audio.currentTime + 10 <= audio.duration) {
        audio.currentTime += 10;
    } else {
        // If the remaining time is less than 10 seconds, set it to the audio's end
        audio.currentTime = audio.duration;
    }
};

// Add event listener for the fast-forward button
document.getElementById('fastforward').addEventListener('click', forward);


// Rewind (backward) function
const backward = () => {
    // Ensure that the audio doesn't go before the start (0 seconds)
    if (audio.currentTime - 10 >= 0) {
        audio.currentTime -= 10;
    } else {
        // If less than 10 seconds have passed, set it to the beginning
        audio.currentTime = 0;
    }
};

// Add event listener for the rewind button
document.getElementById('fastbackward').addEventListener('click', backward);
