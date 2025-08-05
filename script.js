window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
    } else {
    navbar.classList.remove('scrolled');
    }
});

const shapes = document.querySelectorAll(".floating-shapes .shape");
const shapeData = [];

// Store original positions
shapes.forEach(shape => {
    const rect = shape.getBoundingClientRect();
    shapeData.push({
    el: shape,
    baseX: rect.left + window.scrollX,
    baseY: rect.top + window.scrollY,
    offsetX: 0,
    offsetY: 0,
    floatPhase: Math.random() * Math.PI * 2 
    });
});

let mouseX = null, mouseY = null;

document.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateShapes() {
    const time = Date.now() * 0.001;

    shapeData.forEach(data => {
    // Gentle floating motion
    const floatX = Math.sin(time + data.floatPhase) * 15;
    const floatY = Math.cos(time * 0.8 + data.floatPhase) * 15;

    // Push away if mouse is close
    if (mouseX !== null && mouseY !== null) {
        const dx = mouseX - (data.baseX + data.offsetX);
        const dy = mouseY - (data.baseY + data.offsetY);
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 200) {
        const angle = Math.atan2(dy, dx);
        const pushStrength = (200 - dist) / 200; // 0 to 1
        data.offsetX -= Math.cos(angle) * pushStrength * 25;
        data.offsetY -= Math.sin(angle) * pushStrength * 25;
        }
    }
    data.offsetX *= 0.95;
    data.offsetY *= 0.95;
    data.el.style.transform =
        `translate(${floatX + data.offsetX}px, ${floatY + data.offsetY}px)`;
    });

    requestAnimationFrame(animateShapes);
}

animateShapes();

// Animate sections on scroll into view
document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
        entry.target.classList.add("show-section");
        observer.unobserve(entry.target);
        }
    });
    }, { threshold: 0.15 });

    document.querySelectorAll(".hidden-section").forEach(section => {
    observer.observe(section);
    });
});

document.addEventListener("DOMContentLoaded", () => {
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
    if (entry.isIntersecting) {
        entry.target.classList.add("show-animation");
        observer.unobserve(entry.target); 
    }
    });
}, { threshold: 0.2 }); 

document.querySelectorAll('.skill-category, .project-card, .certificate-list a')
    .forEach(el => {
    observer.observe(el);
    });
});