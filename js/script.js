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

let dubSlideIndex = 1;
let karaokeSlideIndex = 1;

// Next/previous controls
function plusDubSlides(n) {
  showDubDemoSlides((dubSlideIndex += n));
  videos.forEach((videoData) => {
    const video = document.getElementById(`video-${videoData.id}`);
    const originalAudio = document.getElementById(
      `original-audio-${videoData.id}`
    );
    const dubAudio = document.getElementById(`dub-audio-${videoData.id}`);

    video.pause();
    originalAudio.pause();
    dubAudio.pause();
  });
}

function plusKaraokeSlides(n) {
  showKaraokeDemoSlides((karaokeSlideIndex += n));
  karaokes.forEach((videoData) => {
    const originVideo = document.getElementById(
      `original-video-${videoData.id}`
    );
    const karaokeVideo = document.getElementById(
      `karaoke-video-${videoData.id}`
    );

    originVideo.pause();
    karaokeVideo.pause();
  });
}

function currentDubSlide(n) {
  showDubDemoSlides((dubSlideIndex = n));
}
function currentKaraokeSlide(n) {
  showKaraokeDemoSlides((karaokeSlideIndex = n));
}

function showDubDemoSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dub-dot");
  if (n > slides.length) {
    dubSlideIndex = 1;
  }
  if (n < 1) {
    dubSlideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[dubSlideIndex - 1].style.display = "block";
  dots[dubSlideIndex - 1].className += " active";
}

function showKaraokeDemoSlides(n) {
  let i;
  let karaokeSlides = document.getElementsByClassName("karaoke-slides");
  let karaokeDots = document.getElementsByClassName("karaoke-dot");
  if (n > karaokeSlides.length) {
    karaokeSlideIndex = 1;
  }
  if (n < 1) {
    karaokeSlideIndex = karaokeSlides.length;
  }
  for (i = 0; i < karaokeSlides.length; i++) {
    karaokeSlides[i].style.display = "none";
  }
  for (i = 0; i < karaokeDots.length; i++) {
    karaokeDots[i].className = karaokeDots[i].className.replace(" active", "");
  }
  karaokeSlides[karaokeSlideIndex - 1].style.display = "block";
  karaokeDots[karaokeSlideIndex - 1].className += " active";
}

// Video data array
const videos = [
  {
    id: "video1",
    videoSrc: "assets/videos/video1.mp4", // Update with your actual video path
    thumbnail: "assets/img/path.jpg",
    audioTracks: {
      original: "assets/audios/vocals1.mp3", // Update with your actual audio path
      dub: "assets/audios/dubbed_track1.wav", // Update with your actual audio path
    },
    flags: {
      dub: "assets/img/en-flag.webp", // Update with your actual flag imgae
      original: "assets/img/Flag_of_Russia.png",
    },
  },
  {
    id: "video2",
    videoSrc: "assets/videos/video2.mp4", // Update with your actual video path
    thumbnail: "assets/img/Flag_of_Russia.png",
    audioTracks: {
      original: "assets/audios/vocals2.mp3", // Update with your actual audio path
      dub: "assets/audios/dubbed_track2.wav", // Update with your actual audio path
    },
    flags: {
      dub: "assets/img/en-flag.webp", // Update with your actual flag imgae
      original: "assets/img/Flag_of_Russia.png",
    },
  },
  {
    id: "video3",
    videoSrc: "assets/videos/video3.mp4", // Update with your actual video path
    thumbnail: "assets/img/ind-flag.png",
    audioTracks: {
      original: "assets/audios/vocals3.mp3", // Update with your actual audio path
      dub: "assets/audios/dubbed_track3.wav", // Update with your actual audio path
    },
    flags: {
      dub: "assets/img/en-flag.webp", // Update with your actual flag imgae
      original: "assets/img/Flag_of_Russia.png",
    },
  },
];

// Video data array
const karaokes = [
  {
    id: "video1",
    videoSrc: "assets/videos/video1.mp4", // Update with your actual video path
    videoThumbnail: "assets/img/ind-flag.png",
    karaokeSrc: "assets/videos/karaoke1.mp4",
    karaokeThumbnail: "assets/img/path.jpg",
  },
  {
    id: "video2",
    videoSrc: "assets/videos/video1.mp4", // Update with your actual video path
    videoThumbnail: "assets/img/path.jpg",
    karaokeSrc: "assets/videos/karaoke1.mp4",
    karaokeThumbnail: "assets/img/path.jpg",
  },
  {
    id: "video3",
    videoSrc: "assets/videos/video1.mp4", // Update with your actual video path
    videoThumbnail: "assets/img/path.jpg",
    karaokeSrc: "assets/videos/karaoke1.mp4",
    karaokeThumbnail: "assets/img/path.jpg",
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
            Your browser does not support the video tag.'
          </video>
          <div id="dub-play-sign-${videoData.id}" class="dub-play-sign">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="max-width: 24px; max-height: 24px;" width="3vw" height="3vw">
              <path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z"></path>
            </svg>
          </div>
          <div class="video-controls" >
            <input type="range" class="seek-bar" id="dub-seek-bar-${videoData.id}" value="0" min="0" max="100" step="0.1">
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
            <!-- <button class="play-pause-button" id="play-pause-button-${videoData.id}" >
              <div id="dub-play-sign-${videoData.id}" class="play-sign">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="max-width: 24px; max-height: 24px;" width="3vw" height="3vw">
                  <path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z"></path>
                </svg>
              </div>

              <div id="pause-sign-${videoData.id}" class="pause-sign">
                <svg style="max-width: 24px; max-height: 24px;" width="3vw" height="3vw" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="48" height="48" fill="white" fill-opacity="0.01"/>
                  <path d="M16 12V36" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M32 12V36" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
            </button> -->
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
    const playButton = document.getElementById(`dub-play-sign-${videoData.id}`);

    const seekBar = document.getElementById(`dub-seek-bar-${videoData.id}`);

    // let currentAudio = originalAudio;
    const currentAudioRef = { audio: originalAudio };

    // Update the seek bar as the video plays
    video.addEventListener("timeupdate", () => {
      const progress = (video.currentTime / video.duration) * 100;
      seekBar.value = progress;
    });

    // Seek the video when the user interacts with the slider
    seekBar.addEventListener("input", () => {
      const seekTo = (seekBar.value / 100) * video.duration;
      video.currentTime = seekTo;
      currentAudioRef.audio.currentTime = seekTo;
    });

    // Add event listeners
    video.addEventListener("click", () =>
      playPauseDemoVideo(
        video,
        currentAudioRef,
        playButton,
        dubAudioPlayButton,
        originalAudioPlayButton,
        originalAudio,
        dubAudio
      )
    );
    playButton.addEventListener("click", () =>
      playPauseDemoVideo(
        video,
        currentAudioRef,
        playButton,
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
        dubAudioPlayButton,
        originalAudioPlayButton,
        originalAudio,
        dubAudio
      );
    });
    video.addEventListener("ended", () => {});
  });

  const slideDubDotContainer = document.createElement("div");
  slideDubDotContainer.className = "slider-dub-dot-container ";
  // set inner HTML for the slider dots
  videos.forEach((video, index) => {
    const dot = document.createElement("span");
    dot.className = "dub-dot";
    dot.setAttribute("onclick", `currentDubSlide(${index + 1})`);
    slideDubDotContainer.appendChild(dot);
  });

  // Add the container to main container
  mainContainer.appendChild(slideDubDotContainer);

  showDubDemoSlides(dubSlideIndex);

  // Create karaoke players
  const karaokeDemoContainer = document.getElementById("demo-karaokes");

  // Create video players
  karaokes.forEach((karaoke) => {
    // Create container for this video
    const karaokeContainer = document.createElement("div");
    karaokeContainer.className = "karaoke-container ";
    karaokeContainer.id = `karaoke-container-${karaoke.id}`;

    // Set inner HTML for the video container
    karaokeContainer.innerHTML = `
    <div class="karaoke-slides fade">
          <!-- Video Element -->
          <video id="original-video-${karaoke.id}"  class="demo-video " muted playsinline preload="metadata" poster="${karaoke.videoThumbnail} ">
            <source src="${karaoke.videoSrc}" type="video/mp4" >
            Your browser does not support the video tag.'
          </video>
          <video id="karaoke-video-${karaoke.id}"  class="demo-video " muted playsinline preload="metadata" poster="${karaoke.karaokeThumbnail} ">
            <source src="${karaoke.karaokeSrc}" type="video/mp4" >
            Your browser does not support the video tag.'
          </video>
          <div id="play-sign-${karaoke.id}" class="play-sign">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="max-width: 24px; max-height: 24px;" width="3vw" height="3vw">
              <path d="M9 6c0 -.852 .986 -1.297 1.623 -.783l.084 .076l6 6a1 1 0 0 1 .083 1.32l-.083 .094l-6 6l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002l-.059 -.002l-.058 -.005l-.06 -.009l-.052 -.01l-.108 -.032l-.067 -.027l-.132 -.07l-.09 -.065l-.081 -.073l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057l-.002 -12.059z"></path>
            </svg>
          </div>
          <div class="video-controls" >
            <input type="range" class="seek-bar" id="seek-karaoke-bar-${karaoke.id}" value="0" min="0" max="100" step="0.1">
          </div>

          <!-- Language Toggle Buttons -->
          <div class="switch-language-button-container ">
            <button
              class="video-play-button"
              id="original-audio-button-${karaoke.id}"
              onclick="switchLanguage('original')"
            >
              song
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
              class="karaoke-play-button"
              id="dub-audio-button-${karaoke.id}"
              onclick="switchLanguage('dub')"
            >
              karaoke
            </button>
            </div>
          </div>
        `;

    // Add the container to main container
    karaokeDemoContainer.appendChild(karaokeContainer);

    // Initialize video functionality
    const originalVideo = document.getElementById(
      `original-video-${karaoke.id}`
    );
    const karaokeVideo = document.getElementById(`karaoke-video-${karaoke.id}`);
    const karaokeVideoPlayButton = document.getElementById(
      `karaoke-play-sign-${karaoke.id}`
    );
    const karaokePlayButton = document.getElementById("playButton");
    const originalVideoPlayButton = document.getElementById(
      "originalVideoPlayButton"
    );

    const seekBar = document.getElementById(`seek-karaoke-bar-${karaoke.id}`);

    // Update the seek bar as the video plays
    karaokeVideo.addEventListener("timeupdate", () => {
      const progress = (karaokeVideo.currentTime / karaokeVideo.duration) * 100;
      seekBar.value = progress;
      originalVideo.currentTime = karaokeVideo.currentTime;
    });

    // Seek the video when the user interacts with the slider
    seekBar.addEventListener("input", () => {
      const seekTo = (seekBar.value / 100) * video.duration;
      karaokeVideo.currentTime = seekTo;
      originalVideo.currentTime = seekTo;
    });
  });

  switchKaraokeVideo(
    originalVideo,
    karaokeVideo,
    playButton,
    originalVideoPlayButton,
    karaokeVideoPlayButton
  );

  const slideKaraokeDotContainer = document.createElement("div");
  slideKaraokeDotContainer.className = "slider-karaoke-dot-container ";
  // set inner HTML for the slider dots
  videos.forEach((video, index) => {
    const dot = document.createElement("span");
    dot.className = "karaoke-dot";
    dot.setAttribute("onclick", `currentKaraokeSlide(${index + 1})`);
    slideKaraokeDotContainer.appendChild(dot);
  });

  // Add the container to main container
  karaokeDemoContainer.appendChild(slideKaraokeDotContainer);

  showKaraokeDemoSlides(karaokeSlideIndex);
});

function changePlayPauseSign(
  video,
  currentAudioRef,
  playButton,
  dubAudioPlayButton,
  originalAudioPlayButton,
  originalAudio,
  dubAudio
) {
  if (video.paused) {
    playButton.style.display = "block";

    dubAudioPlayButton.classList.remove("active-flag");
    originalAudioPlayButton.classList.remove("active-flag");
  } else {
    playButton.style.display = "none";
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
    dubAudioPlayButton,
    originalAudioPlayButton,
    originalAudio,
    dubAudio
  );
}

function switchKaraokeVideo(
  originalVideo,
  karaokeVideo,
  playButton,
  originalVideoPlayButton,
  karaokeVideoPlayButton
) {
  // Add event listener for the main play button
  playButton.addEventListener("click", () => {
    if (originalVideo.paused && karaokeVideo.played) {
      // Play both videos when play button is clicked
      karaokeVideo.pause();
      originalVideo.play();
      originalVideoPlayButton.style.display = "block";
      karaokeVideoPlayButton.style.display = "none";
      playButton.style.display = "none";
    } else if (originalVideo.played && karaokeVideo.paused) {
      // Pause both videos when play button is clicked again
      originalVideo.pause();
      karaokeVideo.play();
      originalVideoPlayButton.style.display = "none";
      karaokeVideoPlayButton.style.display = "block";
      playButton.style.display = "none";
    } else if (originalVideo.paused && karaokeVideo.paused) {
      // Pause both videos when play button is clicked again
      originalVideo.play();
      karaokeVideo.pause();
      originalVideoPlayButton.style.display = "block";
      karaokeVideoPlayButton.style.display = "none";
      playButton.style.display = "none";
    }
  });

  // Add event listener for the original video play button
  originalVideoPlayButton.addEventListener("click", () => {
    if (originalVideo.paused) {
      originalVideo.play();
      karaokeVideo.pause();
      originalVideoPlayButton.style.display = "block";
      karaokeVideoPlayButton.style.display = "none";
      playButton.style.display = "none";
    } else {
      originalVideo.pause();
      karaokeVideo.play();
      originalVideoPlayButton.style.display = "none";
      karaokeVideoPlayButton.style.display = "block";
      playButton.style.display = "none";
    }
  });

  // Add event listener for the karaoke video play button
  karaokeVideoPlayButton.addEventListener("click", () => {
    if (karaokeVideo.paused) {
      originalVideo.pause();
      karaokeVideo.play();
      originalVideoPlayButton.style.display = "none";
      karaokeVideoPlayButton.style.display = "block";
      playButton.style.display = "none";
    } else {
      karaokeVideo.pause();
      originalVideo.play();
      originalVideoPlayButton.style.display = "block";
      karaokeVideoPlayButton.style.display = "none";
      playButton.style.display = "none";
    }
  });
}
