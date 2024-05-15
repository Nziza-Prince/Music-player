let  song=document.getElementById("song")
let pause=document.getElementById("play-pause")
let progress=document.getElementById("range")
let next=document.getElementById("next")
let previous=document.getElementById("previous")
let time=document.getElementById("time")
let restart=document.getElementById("restart")
let fileInput=document.getElementById("file")
let playing;
// fileInput.addEventListener('click',()=>{
//    songSelectionProcess()
// })

song.onloadedmetadata=()=>{
   progress.value=song.currentTime
   progress.max=song.duration
   time.textContent=formatTime(song.duration)
}
function formatTime(seconds) {
   let minutes = Math.floor(seconds / 60);
   let remainingSeconds = Math.floor(seconds % 60);
   return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}
pause.onclick=function play(){
   if(pause.classList.contains("fa-play")){
      pause.classList.remove("fa-play")
      pause.classList.add("fa-pause")
      song.play()
      if(song.play()){
         change = setInterval(()=>{
            progress.value=song.currentTime
            time.textContent=formatTime(song.currentTime)
         },1000)
      }
      playing=true
   }
   else{
      function pausing(){
         clearInterval(change)
         pause.classList.remove("fa-pause")
         pause.classList.add("fa-play")
         song.pause()
      }
      pausing()
      playing=false
   }
}
 progress.onchange=()=>{
    song.play()
    song.currentTime=progress.value
    pause.classList.remove("fa-play")
    pause.classList.add("fa-pause")
    
 }

 next.onclick=()=>{
    song.currentTime += 10
    progress.value=song.currentTime
 }

 previous.onclick=()=>{
    song.currentTime -= 10
    progress.value=song.currentTime
 }
 restart.onclick=()=>{
   song.currentTime=0
   progress.value=song.currentTime
   song.play()
   pause.classList.remove("fa-play")
   pause.classList.add("fa-pause") 
 }

//  const songSelectionProcess = () => {
//    if (fileInput.value === '') {
//       alert('Please select a file');
//    } else {
//       const file = fileInput.files[0];
//       const objectURL = URL.createObjectURL(`./${fileInput.value}`);
//       song.src = objectURL;
//       song.load();
//       song.play();
//       pause.classList.remove("fa-play");
//       pause.classList.add("fa-pause");
//    }
// };
document.addEventListener('keydown',(event)=>{
   event.preventDefault();
if(event.key===""){
if (playing===false){
 play()  
}
else{
   pausing()
   }
}
})


