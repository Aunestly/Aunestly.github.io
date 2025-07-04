/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.main-nav a');

  const observerOptions = {
    root: null,
    rootMargin: '-81px 0px -50% 0px', // top margin is header height + 1px
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const navLink = document.querySelector(`.main-nav a[href="#${id}"]`);
      
      if (entry.isIntersecting) {
        // Remove active class from all links
        navLinks.forEach(link => link.classList.remove('active'));
        // Add active class to the current link
        if (navLink) {
          navLink.classList.add('active');
        }
      }
    });
  }, observerOptions);

  sections.forEach(section => {
    observer.observe(section);
  });
});
