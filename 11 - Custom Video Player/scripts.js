const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.full-screen');

function togglePlay(){
    if(video.paused){
		video.play();
	} else {
		video.pause();
	}
    console.log('toggle');
    console.log('video.paused',video.paused);
}

function updateButton(){
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
    console.log('update');
}

function skip(){
    console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    console.log(this.value);
    video[this.name] = this.value;
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) *100;
    progressBar.style.flexBasis = `${percent}%`
}
function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function handleFullscreen(){
    console.log('fullscreen');
    if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen();
      } else 
      if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen();
      }
}


video.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',togglePlay);

skipButtons.forEach(button => button.addEventListener('click',skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

fullscreen.addEventListener('click', handleFullscreen);

let isFullscreen = false; // Flag to track fullscreen state

function handleFullscreen() {
    console.log('fullscreen');
    if (video.requestFullscreen) {
        video.requestFullscreen();
    } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen();
    } else if (video.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        video.webkitRequestFullscreen();
    } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen();
    }
}

let isToggling = false; 

function togglePlayDebounced() {
    if (!isToggling) {
        isToggling = true;
        togglePlay();
        setTimeout(() => {
            isToggling = false;
        }, 100); 
    }
}

video.addEventListener('fullscreenchange', (event) => {
    if (document.fullscreenElement) {
        console.log('Entered fullscreen mode');
        video.addEventListener('click', togglePlayDebounced);
    } else {
        console.log('Exited fullscreen mode');
        video.removeEventListener('click', togglePlayDebounced);
    }
});

