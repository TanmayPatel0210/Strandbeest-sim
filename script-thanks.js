const steps = document.querySelectorAll('.scrolls');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.3
});

steps.forEach(step => {
    observer.observe(step);
});