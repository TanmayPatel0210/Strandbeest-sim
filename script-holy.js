// 1. Grab every section that has the 'scroll-step' class
const steps = document.querySelectorAll('.scroll');

// 2. Set up the tripwire (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // If the section has crossed into the viewport
        if (entry.isIntersecting) {
            // Add the 'visible' class to trigger the CSS animation
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.3 // Triggers when 30% of the section is visible
});

// 3. Attach the tripwire to every step
steps.forEach(step => {
    observer.observe(step);
});