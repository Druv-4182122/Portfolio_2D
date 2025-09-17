document.addEventListener("DOMContentLoaded", () => {

  // 1. LENIS SMOOTH SCROLL SETUP
  // =================================================================
  const lenis = new Lenis({
    duration: 1.2, // speed
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easing function
  });

  // Connect Lenis to GSAP's ticker
  lenis.on('scroll', (e) => {
    // console.log(e) // Uncomment to see scroll data
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  
  gsap.ticker.lagSmoothing(0);


  // 2. GSAP SCROLL-IN ANIMATIONS
  // =================================================================
  // Register the GSAP ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);

  // Select all the project cards
  const projectCards = gsap.utils.toArray('.project-card');

  // Loop through each project card and create a scroll animation
  projectCards.forEach(card => {
    gsap.fromTo(card, 
      { 
        // Initial state (hidden)
        opacity: 0,
        y: 50 // Start 50px below its final position
      }, 
      {
        // Final state (visible)
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        // Define the scroll trigger
        scrollTrigger: {
          trigger: card, // The element that triggers the animation
          start: 'top 85%', // Start animation when the top of the card is 85% down the viewport
          toggleActions: 'play none none none', // Play the animation once and don't reverse it
        }
      }
    );
  });

});