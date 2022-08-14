"use strict"
//This is a complex nacow background happening.
const screen = document.querySelector(".screen");
const videoContainer = document.querySelector(".video-player");
const controller = document.querySelector(".video-player .controller");
const volume = document.querySelector(".volume");
const skip = document.querySelectorAll(".skip")
const timerP = document.querySelectorAll(".niger")
const playBtn = document.querySelector(".play");
const video = document.querySelector("#dynamic");
const current = document.querySelector(".video-player .controller .rangeAndTime .text #current");
const duration = document.querySelector(".video-player .controller .rangeAndTime .text #duration");
const range = document.querySelector(".video-player .controller .rangeAndTime .range-container #range");
const value = document.querySelector(".video-player .controller .rangeAndTime .range-container #range .value");
const videoLinks= document.getElementsByClassName("videoLink");
const dot = document.querySelector(".video-player .controller .rangeAndTime .range-container #range .value #dot");
const playlist = document.querySelector(".videos-playlist");
const upload = document.querySelector("#upload");
const title = document.getElementById("title");
const uploadBtn = document.querySelector(".uploadBtn");
let width = parseInt(getComputedStyle( range, null ).getPropertyValue("width"));
let videos = [], names = [];
let i = -1;
function playListIteration() {
  if(videos.length < 0) console.log("have no links")
  else {
    let el = document.createElement("section");
    let txt = document.createElement("p");
    el.setAttribute("class", "videoLink");
    el.setAttribute("onclick", `videoContent(${i})`);
    txt.innerText = names[i];
    el.appendChild(txt);
    playlist.appendChild(el);
   }
}
function updateDuration() {
 let calc = video.currentTime / video.duration * 100;
 if(calc === 100) playBtn.setAttribute("class", "fas fa-play play")
 value.style.width = `${calc}%`; 
}
function timer() { 
 
 let currentTimer = {h : 0, m : Math.floor(video.currentTime / 60), s : Math.floor(video.currentTime % 60)};
 if(currentTimer.s < 10) currentTimer.s = `0${currentTimer.s}`;
 if(currentTimer.m > 59) {
   currentTimer.h = Math.floor(currentTimer.m / 60);
   let c = Math.floor(currentTimer.m % 60);
   if(c < 10) c = `0${c}`; 
   currentTimer.m = `${currentTimer.h}:${c}`;
 }
 timerP[0].innerText = `${currentTimer.m}:${currentTimer.s}`;
}
video.addEventListener("loadeddata", function() {
 video.currentTime = 0.01;
 let endDuration = {h : 0, m : Math.floor(video.duration / 60), s : Math.floor(video.duration % 60)};
 if(endDuration.s < 10) endDuration.s = `0${endDuration.s}`;
 if(endDuration.m > 59) {
   endDuration.h = Math.floor(endDuration.m / 60);
   let c = Math.floor(endDuration.m % 60);
   if(c < 10) c = `0${c}`; 
   endDuration.m = `${endDuration.h}:${c}`;
 }
 timerP[1].innerText = `${endDuration.m}:${endDuration.s}`;
 updateContent();
 updateDuration();
});
video.addEventListener("timeupdate", function() {
 updateDuration();
 timer(); 
})
function updateList() {
 const file = upload.files[0];
 const readFile = new FileReader();
 readFile.readAsDataURL(file);
 readFile.addEventListener("load", function() {
  if(names.includes(file.name))  { 
   console.error("found a same type of file"); 
   return false;
   }
  if(file.name.indexOf(".mp4") <= -1) {
   alert("file must extension .mp4");
   return false;
  } else {
   videos.push(readFile.result);
   i++;
   names.push(file.name);
   playListIteration();
  }
 });
}
function videoContent(i) {
 for(let r = 0; r < videoLinks.length; r++) videoLinks[r].classList.remove("active");
 videoLinks[i].classList.add("active")
 playBtn.setAttribute("class","fas fa-play play");
 video.src = videos[i];
 title.innerText = names[i];
 timer();
}

range.addEventListener("touchmove", function(event) {
 if(video.src === "") {
  console.log("Don\'t have any video sources.")
 } else {
  let xes = Math.floor(event.targetTouches[0].clientX * 100 / width - 6);
  if(xes <= 0) xes = 0;
  if(xes >= 100) xes = 100;
  video.currentTime = xes*video.duration /100;
  value.style.width = `${xes}%`;
  }
});
range.addEventListener("touchstart", function(event) {
 if(video.src === "") {
  console.log("Don\'t have any video sources.")
 } else {
  let xes = Math.floor(event.targetTouches[0].clientX * 100 / width - 6);
  if(xes <= 0) xes = 0;
  if(xes >= 100) xes = 100;
  video.currentTime = xes*video.duration /100;
  value.style.width = `${xes}%`;
  }
});

uploadBtn.addEventListener("click", function() {
 upload.click();
});
upload.addEventListener("change", function() {
 updateList();
});
let bool = false;
playBtn.addEventListener("click", function() {
 if(bool) {
  playBtn.setAttribute("class", "fas fa-play");
  video.pause();
  bool = false;
 } else {
  playBtn.setAttribute("class", "fas fa-pause");
  video.play();
  bool = true;
 }
})
skip.forEach((e,i) => {
e.addEventListener("click", function() {
 if(i === 0) video.currentTime -= 10;
 if(i === 1) video.currentTime += 10;
});
});
let boolean = true, boolean_2 = true;
volume.addEventListener("click", function() {
 if(boolean) {
  volume.childNodes[0].setAttribute("class", "fas fa-volume-mute")
  video.volume = 0;
  boolean = false;
 } else {
 volume.childNodes[0].setAttribute("class", "fas fa-volume-up")
  video.volume = 1;
  boolean = true;
 }
});

screen.addEventListener("click", function() {
 if(boolean_2) {
  videoContainer.requestFullscreen();
  video.style.height = "100%";
  screen.setAttribute("class","fas fa-compress screen");
  boolean_2 = false;
 } else {
  document.exitFullscreen();
  screen.setAttribute("class","fas fa-expand screen");
  video.style.height ="45vh";
  boolean_2 = true;
 }
});
let bool_2 = false;
function openController() {
 if(!bool_2) {
  controller.style.opacity = 1;
  bool_2 = true;
 } else {
  controller.style.opacity = 0;
  bool_2 = false;
 }
}

videoContainer.addEventListener("click", function() {
 openController();
})
videoContainer.addEventListener("mouseout", function() {
 bool_2 = true;
 openController();
})
