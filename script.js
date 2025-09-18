// Function to create stars randomly positioned in the background
function createStars() {
  const starsContainer = document.getElementById('stars-container');
  
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.classList.add('star');
    
    // Random positioning
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    
    // Random size
    const size = Math.random() * 3 + 1;
    star.style.width = size + 'px';
    star.style.height = size + 'px';
    
    // Random animation delay for twinkling
    star.style.animationDelay = Math.random() * 2 + 's';
    
    starsContainer.appendChild(star);
  }
}

// Function to fade out the moon screen
function fadeOutMoon() {
  const moonScreen = document.getElementById('moon-screen');
  moonScreen.classList.add('fade-out');
  
  // Remove the moon screen and show video after animation finishes
  setTimeout(() => {
    moonScreen.style.display = 'none';
    showVideo();
  }, 2000);
}

// Function to show the video
function showVideo() {
  const videoContainer = document.getElementById('video-container');
  const video = document.getElementById('main-video');
  
  videoContainer.classList.remove('hidden');
  videoContainer.style.opacity = '0';
  
  // Fade in the video
  setTimeout(() => {
    videoContainer.style.transition = 'opacity 1s ease-in-out';
    videoContainer.style.opacity = '1';
    
    // Make video play slower (0.8 = 80% speed)
    video.playbackRate = 0.8;
    
    // Start subtitle system immediately
    initializeSubtitles(video);
  }, 100);
}

// Subtitle system
function initializeSubtitles(video) {
  // Define subtitle timings (in seconds) and character dialogue
  const subtitles = [
    { start: 2, end: 8, character: "Benny de Beer", text: "Welkom, vrienden! Ik ben Benny de Beer, en vandaag gaan we op een GROOT avontuur!" },
    { start: 9, end: 12, character: "Sam de Blauwe Vogel", text: "Waar gaan we naartoe?" },
    { start: 13, end: 18, character: "Benny de Beer", text: "We trekken het bos in. Sommigen zeggen dat daar een monster leeft!" },
    { start: 19, end: 22, character: "Noor de Sok", text: "Hopelijk niet ergens gevaarlijks..." },
    { start: 23, end: 26, character: "Sam de Blauwe Vogel", text: "Een monster? Echt?" },
    { start: 27, end: 30, character: "Noor de Sok", text: "Dat klinkt niet goed." },
    { start: 31, end: 35, character: "Timo de Hond", text: "Ik ruik avontuur! Laten we gaan!" }
  ];

  const subtitleContainer = document.getElementById('subtitles-container');
  const characterName = document.getElementById('character-name');
  const subtitleText = document.getElementById('subtitle-text');

  console.log('Story character subtitles initialized'); // Debug message

  // Show subtitles based on video time
  video.addEventListener('timeupdate', () => {
    const currentTime = video.currentTime;
    let currentSubtitle = null;

    // Find current subtitle
    for (let subtitle of subtitles) {
      if (currentTime >= subtitle.start && currentTime <= subtitle.end) {
        currentSubtitle = subtitle;
        break;
      }
    }

    // Show or hide subtitles
    if (currentSubtitle) {
      characterName.textContent = currentSubtitle.character;
      subtitleText.textContent = currentSubtitle.text;
      subtitleContainer.classList.remove('hidden');
      console.log('Showing subtitle:', currentSubtitle.character, '-', currentSubtitle.text); // Debug message
    } else {
      subtitleContainer.classList.add('hidden');
    }
  });

  // Also trigger on play
  video.addEventListener('play', () => {
    console.log('Video started playing');
  });
}

// Initialize stars when the page loads
window.addEventListener('DOMContentLoaded', () => {
  createStars();
  
  // Fade out moon after 4 seconds
  setTimeout(fadeOutMoon, 4000);
});