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
  videoContainer.classList.remove('hidden');
  videoContainer.style.opacity = '0';
  
  // Fade in the video
  setTimeout(() => {
    videoContainer.style.transition = 'opacity 1s ease-in-out';
    videoContainer.style.opacity = '1';
  }, 100);
}

// Initialize stars when the page loads
window.addEventListener('DOMContentLoaded', () => {
  createStars();
  
  // Fade out moon after 4 seconds
  setTimeout(fadeOutMoon, 4000);
});