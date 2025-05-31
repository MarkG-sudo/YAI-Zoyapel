document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");
    const navLinks = document.querySelectorAll("nav ul li a");
    const sections = document.querySelectorAll("section");
    const offset = document.querySelector("header").offsetHeight - 10; // Adjust offset for sticky header

    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked and scroll smoothly
    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            navMenu.classList.remove("active");

            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    function highlightNav() {
        let scrollPosition = window.scrollY + offset; // Adjust scroll position

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - offset; // Ensure section aligns correctly
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }

    window.addEventListener("scroll", highlightNav);
});


window.onscroll = function () {
    let btn = document.getElementById("scrollUpBtn");
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        btn.classList.add("show");
    } else {
        btn.classList.remove("show");
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}


document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll(".testimonial-card");
    const dotsContainer = document.querySelector(".testimonial-dots");
    let index = 0;
    let autoScroll;

    // Create slide dots dynamically
    testimonials.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => changeSlide(i, true));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function changeSlide(newIndex, stopAuto = false) {
        testimonials[index].classList.remove("active");
        dots[index].classList.remove("active");

        index = newIndex;

        testimonials[index].classList.add("active");
        dots[index].classList.add("active");

        if (stopAuto) restartAutoScroll();
    }

    // Auto-scroll every 5 seconds
    function startAutoScroll() {
        autoScroll = setInterval(() => {
            changeSlide((index + 1) % testimonials.length);
        }, 5000);
    }

    function restartAutoScroll() {
        clearInterval(autoScroll);
        startAutoScroll();
    }

    startAutoScroll(); // Start auto-scrolling on load

    // Swipe for mobile (Swipe Anywhere on Card)
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Minimum swipe distance

    document.querySelectorAll(".testimonial-card").forEach((card) => {
        card.addEventListener("touchstart", (e) => {
            touchStartX = e.touches[0].clientX;
        });

        card.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].clientX;
            handleSwipe();
        });
    });

    function handleSwipe() {
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe Left (Next)
            changeSlide((index + 1) % testimonials.length, true);
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe Right (Prev)
            changeSlide((index - 1 + testimonials.length) % testimonials.length, true);
        }
    }

    // Desktop Arrows (Stop Auto-scroll on Click)
    document.getElementById("prevBtn").addEventListener("click", function () {
        changeSlide((index - 1 + testimonials.length) % testimonials.length, true);
    });

    document.getElementById("nextBtn").addEventListener("click", function () {
        changeSlide((index + 1) % testimonials.length, true);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const flipCards = document.querySelectorAll(".flip-card");

    flipCards.forEach(card => {
        card.addEventListener("click", () => {
            // Toggle flip manually on click (for mobile)
            card.querySelector(".flip-card-inner").classList.toggle("flipped");
        });
    });
});
