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

    // Create slide dots dynamically
    testimonials.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => changeSlide(i));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll(".dot");

    function changeSlide(newIndex) {
        testimonials[index].classList.remove("active");
        dots[index].classList.remove("active");

        index = newIndex;

        testimonials[index].classList.add("active");
        dots[index].classList.add("active");
    }

    // Swipe for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.querySelector(".testimonial-content").addEventListener("touchstart", (e) => {
        touchStartX = e.touches[0].clientX;
    });

    document.querySelector(".testimonial-content").addEventListener("touchend", (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // Min swipe distance

        if (touchStartX - touchEndX > swipeThreshold) {
            // Swipe Left (Next)
            changeSlide((index + 1) % testimonials.length);
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swipe Right (Prev)
            changeSlide((index - 1 + testimonials.length) % testimonials.length);
        }
    }

    // Desktop Arrows (Keep As Is)
    document.getElementById("prevBtn").addEventListener("click", function () {
        changeSlide((index - 1 + testimonials.length) % testimonials.length);
    });

    document.getElementById("nextBtn").addEventListener("click", function () {
        changeSlide((index + 1) % testimonials.length);
    });
});
