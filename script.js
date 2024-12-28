console.log("Let's begin the JS journey");
// Select the button by its class
const signupButton = document.querySelector('.signupbtn');

// Add a click event listener
signupButton.addEventListener('click', () => {
    // Redirect to the signup.html page
    window.location.href = 'signup.html';
});

async function getsongs() {
   
        let a = await fetch("http://127.0.0.1:5500/sonifixy-Music-Player-/songs/");
        let response = await a.text();
        console.log(response);

        let div = document.createElement("div");
        div.innerHTML = response; // Corrected `dispatchEvent.innerHTML` to `div.innerHTML`

      
        let as = div.getElementsByTagName("a");
        let songs = [];

        for (let i = 0; i < as.length; i++) {
            const element = as[i];
            if (element.href.endsWith(".mp3")) {  // Changed `=` to `===`
                songs.push(element.href.split("/sonifixy-Music-Player-/songs/")[1]);
            }
        }
        
       return songs
    
}





function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);  // Get full minutes
    const remainingSeconds = Math.floor(seconds % 60);  // Get the remaining seconds (rounded down)

    // Format minutes and seconds to ensure two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}




const playMusic =(track ,pause=false)=>{
    
    currentSong.src="/sonifixy-Music-Player-/songs/"+track
    if(!pause){
    currentSong.play()
     play.src="pause.svg"
    }
     document.querySelector(".songinfo").innerHTML=decodeURI(track)
     document.querySelector(".songtime").innerHTML="00.00 / 00.00"
}
let currentSong=new Audio();
async function main() {
    // get songs list


let songs= await getsongs();
console.log(songs)
// show all songs in playlist
let songUl=document.querySelector(".songlist").getElementsByTagName("ul")[0]
for (const song of songs) {
    songUl.innerHTML=songUl.innerHTML+`<li>
    
                            <img class="invert" src="music.svg" alt="">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")} </div>
                                <div>Neha</div>
                            </div>
                            <div class="playnow">
                                <span>play now</span>
                                <img class="invert" src="play.svg" alt="">
                            </div>
                      
    
    </li>`;
    
}
Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
    e.addEventListener("click",element=>{
    console.log(e.querySelector(".info").firstElementChild.innerHTML)
    playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
    })
})

play.addEventListener("click",()=>{
    if(currentSong.paused){
        currentSong.play()
    play.src="pause.svg"
    }else{
        currentSong.pause()
         play.src="play.svg"
    }
})

// listen for timeupdate event
currentSong.addEventListener("timeupdate",()=>{
    console.log(currentSong.currentTime,currentSong.duration);
    document.querySelector(".songtime").innerHTML=`${formatTime(currentSong.currentTime)} / ${formatTime(currentSong.duration)}`
document.querySelector(".circle").computedStyleMap.left=(currentSong.currentTime/currentSong.duration)*100 +"%";4


})


// seekbar event listner
document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

    // Correctly setting the left position of the circle
    document.querySelector(".circle").style.left = percent + "%"; 

    // Set the current time of the song based on the clicked position
    currentSong.currentTime = (currentSong.duration * percent) / 100;
});
// add eveentlistner for hamburger
document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left="0";
})

document.querySelector(".close").addEventListener("click",()=>{
    document.querySelector(".left").style.left="-110%";
})

// var audio = new Audio(songs[2]);
// audio.play();

// audio.addEventListener("loadeddata",()=>{
//     let duration=audio.duration;
//     console.log(duration)
// })

}
main()