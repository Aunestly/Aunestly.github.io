/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

document.addEventListener('DOMContentLoaded', () => {
  // Splash screen logic
  const splashScreen = document.getElementById('splash-screen');
  const splashButtons = document.querySelectorAll('.splash-btn');

  if (splashScreen) {
    splashButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href');
        if (!targetId) return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;
        
        // Listen for the transition to end, then hide the element completely.
        // The { once: true } option automatically removes the event listener after it runs.
        splashScreen.addEventListener('transitionend', () => {
          splashScreen.style.display = 'none';
        }, { once: true });

        // Add the class to start the fade-out animation
        splashScreen.classList.add('hidden');
        
        // Scroll to the section.
        targetElement.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }


  // Observer for active navigation link highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  const navObserverOptions = {
    root: null,
    rootMargin: '-81px 0px -50% 0px', // top margin is header height + 1px
    threshold: 0,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`.main-nav a[href="#${id}"]`);
      
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove('active'));
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  }, navObserverOptions);

  sections.forEach(section => {
    navObserver.observe(section);
  });

  // Observer for scroll animations
  const animatedElements = document.querySelectorAll('[data-scroll-animate]');

  const animationObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      // Add a staggered delay for list items
      if (entry.target.tagName === 'LI') {
        (entry.target as HTMLElement).style.setProperty('--i', index.toString());
      }

      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // Animate only once
      }
    });
  }, animationObserverOptions);

  animatedElements.forEach(el => {
    animationObserver.observe(el);
  });
});