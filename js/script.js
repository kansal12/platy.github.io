// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Add gradient animation to hero section
const hero = document.querySelector(".hero");
let angle = 0;

function updateGradient() {
  angle = (angle + 1) % 360;
  hero.style.background = `linear-gradient(${angle}deg, #275464, #2A2764)`;
  requestAnimationFrame(updateGradient);
}

// Intersection Observer for fade-in animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
      }
    });
  },
  {
    threshold: 0.1,
  }
);

// Observe all feature and benefit cards
document.querySelectorAll(".feature-card, .benefit-card").forEach((card) => {
  observer.observe(card);
});

// Initialize gradient animation
updateGradient();

// dot navigation

let slideIndex = 1;
// showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
// Video data array
const videos = [
  {
    id: "video1",
    videoSrc: "assets/videos/video.mp4", // Update with your actual video path
    thumbnail: "assets/img/path.jpg",
    audioTracks: {
      original: "assets/audios/vocals.mp3", // Update with your actual audio path
      dub: "assets/audios/dubbed_track.wav", // Update with your actual audio path
    },
    flags: {
      dub: "assets/img/en-flag.webp", // Update with your actual flag imgae
      original: "assets/img/Flag_of_Russia.png",
    },
  },
  {
    id: "video2",
    videoSrc: "assets/videos/video.mp4", // Update with your actual video path
    thumbnail: "assets/img/Flag_of_Russia.png",
    audioTracks: {
      original: "assets/audios/vocals.mp3", // Update with your actual audio path
      dub: "assets/audios/dubbed_track.wav", // Update with your actual audio path
    },
    flags: {
      dub: "assets/img/en-flag.webp", // Update with your actual flag imgae
      original: "assets/img/Flag_of_Russia.png",
    },
  },
  {
    id: "video3",
    videoSrc: "assets/videos/video.mp4", // Update with your actual video path
    thumbnail: "assets/img/ind-flag.png",
    audioTracks: {
      original: "assets/audios/vocals.mp3", // Update with your actual audio path
      dub: "assets/audios/dubbed_track.wav", // Update with your actual audio path
    },
    flags: {
      dub: "assets/img/en-flag.webp", // Update with your actual flag imgae
      original: "assets/img/Flag_of_Russia.png",
    },
  },
];

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const mainContainer = document.getElementById("demo-videos");

  // Create video players
  videos.forEach((videoData) => {
    // Create container for this video
    const videoContainer = document.createElement("div");
    videoContainer.className = "video-container ";
    videoContainer.id = `video-container-${videoData.id}`;

    // Set inner HTML for the video container
    videoContainer.innerHTML = `
    <div class="mySlides fade">
          <!-- Video Element -->
          <video id="video-${videoData.id}"  class="demo-video " muted playsinline preload="metadata" poster="${videoData.thumbnail} ">
            <source src="${videoData.videoSrc}" type="video/mp4" >
            Your browser does not support the video tag.
          </video>
          <div class="video-controls" >
    <input type="range" class="seek-bar" id="seek-bar-${videoData.id}" value="0" min="0" max="100" step="0.1">
  </div>
          

          <!-- Audio Tracks -->
          <audio
            id="original-audio-${videoData.id}"
            src="${videoData.audioTracks.original}"
          ></audio>
          <audio
            id="dub-audio-${videoData.id}"
            src="${videoData.audioTracks.dub}"
          ></audio>

          <!-- Language Toggle Buttons -->
          <div class="switch-language-button-container ">
            <button
              class="flag-img-container"
              id="original-audio-button-${videoData.id}"
              onclick="switchLanguage('original')"
            >
              <img
                width="100%"
                src="${videoData.flags.original}" 
                alt="flag-icon"
              />
            </button>
            <!-- greater than sign -->
            <svg
              class="greater-than-sign"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              aria-hidden="true"
            >
              <path
                stroke="currentColor"
                stroke-width="1.5"
                d="m6 12 4-4-4-4"
              ></path>
            </svg>
            <button
              class="flag-img-container"
              id="dub-audio-button-${videoData.id}"
              onclick="switchLanguage('dub')"
            >
              <img
                width="100%"
                src="${videoData.flags.dub}"
              />
            </button>
            <button class="play-pause-button" id="play-pause-button-${videoData.id}" >
              <div id="play-sign-${videoData.id}" class="play-sign">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M17 10 5.75 16.928V3.072z"
                  ></path>
                </svg>
              </div>
              <div id="pause-sign-${videoData.id}" class="pause-sign">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    d="M4 3h4v14H4zM12 3h4v14h-4z"
                  ></path>
                </svg>
              </div>
            </button>
            </div>
          </div>
        `;

    // Add the container to main container
    mainContainer.appendChild(videoContainer);

    // Initialize video functionality
    const video = document.getElementById(`video-${videoData.id}`);
    const originalAudio = document.getElementById(
      `original-audio-${videoData.id}`
    );
    const dubAudio = document.getElementById(`dub-audio-${videoData.id}`);
    const originalAudioPlayButton = document.getElementById(
      `original-audio-button-${videoData.id}`
    );
    const dubAudioPlayButton = document.getElementById(
      `dub-audio-button-${videoData.id}`
    );
    const playButton = document.getElementById(`play-sign-${videoData.id}`);
    const pauseButton = document.getElementById(`pause-sign-${videoData.id}`);
    const playPauseButton = document.getElementById(
      `play-pause-button-${videoData.id}`
    );

    const seekBar = document.getElementById(`seek-bar-${videoData.id}`);

    // Update the seek bar as the video plays
    video.addEventListener("timeupdate", () => {
      const progress = (video.currentTime / video.duration) * 100;
      seekBar.value = progress;
    });

    // Seek the video when the user interacts with the slider
    seekBar.addEventListener("input", () => {
      const seekTo = (seekBar.value / 100) * video.duration;
      video.currentTime = seekTo;
    });

    // let currentAudio = originalAudio;
    const currentAudioRef = { audio: originalAudio };

    // Add event listeners
    // video.addEventListener("click", () =>
    //   playPauseVideo(video, currentAudio, playPauseButton)
    // );
    playPauseButton.addEventListener("click", () =>
      playPauseDemoVideo(
        video,
        currentAudioRef,
        playButton,
        pauseButton,
        dubAudioPlayButton,
        originalAudioPlayButton,
        originalAudio,
        dubAudio
      )
    );
    originalAudioPlayButton.addEventListener("click", () => {
      switchLanguage(
        "original",
        video,
        currentAudioRef,
        playButton,
        pauseButton,
        dubAudioPlayButton,
        originalAudioPlayButton,
        originalAudio,
        dubAudio
      );
    });
    dubAudioPlayButton.addEventListener("click", () => {
      switchLanguage(
        "dub",
        video,
        currentAudioRef,
        playButton,
        pauseButton,
        dubAudioPlayButton,
        originalAudioPlayButton,
        originalAudio,
        dubAudio
      );
    });
  });

  const slideDotContainer = document.createElement("div");
  slideDotContainer.className = "slider-dot-container ";
  // set inner HTML for the slider dots
  videos.forEach((video, index) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.setAttribute("onclick", `currentSlide(${index})`);
    slideDotContainer.appendChild(dot);
  });

  // Add the container to main container
  mainContainer.appendChild(slideDotContainer);

  showSlides(slideIndex);
});

function changePlayPauseSign(
  video,
  currentAudioRef,
  playButton,
  pauseButton,
  dubAudioPlayButton,
  originalAudioPlayButton,
  originalAudio,
  dubAudio
) {
  if (video.paused) {
    playButton.style.display = "block";
    pauseButton.style.display = "none";

    dubAudioPlayButton.classList.remove("active-flag");
    originalAudioPlayButton.classList.remove("active-flag");
  } else {
    playButton.style.display = "none";
    pauseButton.style.display = "block";
    if (currentAudioRef.audio === originalAudio) {
      originalAudioPlayButton.classList.add("active-flag");
      dubAudioPlayButton.classList.remove("active-flag");
    } else if (currentAudioRef.audio === dubAudio) {
      dubAudioPlayButton.classList.add("active-flag");
      originalAudioPlayButton.classList.remove("active-flag");
    }
  }
}

function playPauseDemoVideo(
  video,
  currentAudioRef,
  playButton,
  pauseButton,
  dubAudioPlayButton,
  originalAudioPlayButton,
  originalAudio,
  dubAudio
) {
  if (video.paused) {
    video.play(); // Start playing the video
    currentAudioRef.audio.play();
  } else {
    video.pause();
    currentAudioRef.audio.pause();
  }
  changePlayPauseSign(
    video,
    currentAudioRef,
    playButton,
    pauseButton,
    dubAudioPlayButton,
    originalAudioPlayButton,
    originalAudio,
    dubAudio
  );
}

function switchLanguage(
  language,
  video,
  currentAudioRef,
  playButton,
  pauseButton,
  dubAudioPlayButton,
  originalAudioPlayButton,
  originalAudio,
  dubAudio
) {
  // Pause the current audio
  currentAudioRef.audio.pause();

  // Set the current audio based on the selected language
  if (language === "original") {
    currentAudioRef.audio = originalAudio;
  } else if (language === "dub") {
    currentAudioRef.audio = dubAudio;
  }

  // Sync audio with video and play if video is playing
  currentAudioRef.audio.currentTime = video.currentTime;

  // Check if video is paused
  if (video.paused) {
    video.play(); // Start playing the video
    currentAudioRef.audio.play(); // Start playing the selected audio
  } else {
    currentAudioRef.audio.play(); // Continue playing the selected audio if video is already playing
  }
  changePlayPauseSign(
    video,
    currentAudioRef,
    playButton,
    pauseButton,
    dubAudioPlayButton,
    originalAudioPlayButton,
    originalAudio,
    dubAudio
  );
}
