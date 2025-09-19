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
    
    // Make video play slower (0.5 = 50% speed, moderate slow)
    video.playbackRate = 0.5;
    
    // Start subtitle system immediately
    initializeSubtitles(video);
  }, 100);
}

// Subtitle system
function initializeSubtitles(video) {
  // Define subtitle timings (in seconds) and character dialogue
  const subtitles = [
    // Scene 1: At the camp houses (3-17 seconds = 14 seconds total)
    { start: 3, end: 5, character: "Benny de Beer", text: "Welkom, vrienden! Ik ben Benny de Beer, en vandaag gaan we op een GROOT avontuur!" },
    { start: 6, end: 7, character: "Sam de Blauwe Vogel", text: "Waar gaan we naartoe?" },
    { start: 8, end: 10, character: "Benny de Beer", text: "We trekken het bos in. Sommigen zeggen dat daar een monster leeft!" },
    { start: 11, end: 12, character: "Noor de Sok", text: "Hopelijk niet ergens gevaarlijks..." },
    { start: 13, end: 14, character: "Sam de Blauwe Vogel", text: "Een monster? Echt?" },
    { start: 15, end: 16, character: "Noor de Sok", text: "Dat klinkt niet goed." },
    { start: 16.5, end: 17, character: "Timo de Hond", text: "Ik ruik avontuur! Laten we gaan!" },
    
    // Scene 2: In the woods (18-28 seconds = 10 seconds total)
    { start: 18, end: 19.5, character: "Noor de Sok", text: "Waarom hoor ik geen vogels meer?" },
    { start: 19.7, end: 21.2, character: "Sam de Blauwe Vogel", text: "Ik heb het gevoel dat… iemand ons volgt." },
    { start: 21.4, end: 22.5, character: "Noor de Sok", text: "Wat was dat?!" },
    { start: 22.7, end: 24, character: "Timo de Hond", text: "Grrr… iets beweegt daar!" },
    { start: 24.2, end: 25.5, character: "Benny de Beer", text: "Misschien het monster?" },
    { start: 25.7, end: 26.8, character: "Sam de Blauwe Vogel", text: "Moeten we rennen?" },
    { start: 27, end: 28, character: "Timo de Hond", text: "Of jagen! Woef!" },
    
    // Scene 3: Deeper in the woods (29-45 seconds)
    { start: 29, end: 32, character: "Verteller", text: "Benny en de groep gaan nu dieper het bos in." },
    { start: 41, end: 45, character: "Benny de Beer", text: "Kies: links naar de grot of rechts naar het meer!" },
    
    // Scene 4: At the lake (45-52 seconds)
    { start: 45, end: 47, character: "Benny de Beer", text: "Soms is avontuur gewoon genieten van de natuur." },
    { start: 47.5, end: 49, character: "Sam de Blauwe Vogel", text: "Wauw… wat een mooi uitzicht!" },
    { start: 49.5, end: 50.5, character: "Noor de Sok", text: "Het water glinstert zo mooi." },
    { start: 51, end: 52, character: "Timo de Hond", text: "Ik wil springen! Maar… nee, ik blijf gewoon kijken." }
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