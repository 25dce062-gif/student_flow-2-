function loginCheck(event) {
    event.preventDefault();

    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");
    
    if (!usernameInput || !passwordInput) return;

    let username = usernameInput.value;
    let password = passwordInput.value;

    let usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!usernameRegex.test(username)) {
        alert("Login Failed! Username must be 3-15 alphanumeric characters.");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Login Failed! Password must be at least 8 characters long and contain at least one letter and one number.");
        return;
    }

    window.location.href = "home.html";
}

function validateProfileForm(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let enrollment = document.getElementById("enrollment").value;
    let email = document.getElementById("email").value;
    let mobile = document.getElementById("mobile").value;

    let nameRegex = /^[a-zA-Z\s]+$/;
    let enrollmentRegex = /^\d+$/; 
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let mobileRegex = /^\d{10}$/; 

    if (!nameRegex.test(name)) {
        alert("Invalid Name: Only letters and spaces are allowed.");
        return false;
    }
    
    if (!enrollmentRegex.test(enrollment)) {
        alert("Invalid Enrollment No: Only numbers are allowed.");
        return false;
    }
    
    if (!emailRegex.test(email)) {
        alert("Invalid Email Address.");
        return false;
    }
    
    if (!mobileRegex.test(mobile)) {
        alert("Invalid Mobile Number: Must be exactly 10 digits.");
        return false;
    }

    alert("Profile updated successfully!");
    return true;
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Theme Switcher (localStorage)
    const themeBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
    }
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-theme");
            let theme = "light";
            if (document.body.classList.contains("dark-theme")) {
                theme = "dark";
            }
            localStorage.setItem("theme", theme);
        });
    }

    // 2. Hamburger Menu
    const hamburger = document.getElementById("hamburger-btn");
    const navTable = document.querySelector(".nav-table");
    if (hamburger && navTable) {
        hamburger.addEventListener("click", () => {
            navTable.classList.toggle("show");
            let expanded = navTable.classList.contains("show");
            hamburger.setAttribute("aria-expanded", expanded);
        });
    }

    // 3. Notification Banner
    const bannerCloseBtn = document.getElementById("close-banner-btn");
    const banner = document.getElementById("notification-banner");
    if (bannerCloseBtn && banner) {
        bannerCloseBtn.addEventListener("click", () => {
            banner.style.display = "none";
        });
    }

    // 4. Slider
    const slides = document.querySelector(".slides");
    const slideElements = document.querySelectorAll(".slide");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    if (slides && slideElements.length > 0 && prevBtn && nextBtn) {
        let currentIndex = 0;
        function updateSlider() {
            slides.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % slideElements.length;
            updateSlider();
        });
        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + slideElements.length) % slideElements.length;
            updateSlider();
        });
    }

    // 5. Modal
    const modal = document.getElementById("details-modal");
    const openModalBtn = document.getElementById("open-modal-btn");
    const closeModalBtn = document.querySelector(".close-modal");
    if (modal && openModalBtn && closeModalBtn) {
        openModalBtn.addEventListener("click", () => {
            modal.style.display = "block";
            openModalBtn.setAttribute("aria-expanded", "true");
        });
        closeModalBtn.addEventListener("click", () => {
            modal.style.display = "none";
            openModalBtn.setAttribute("aria-expanded", "false");
        });
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
                openModalBtn.setAttribute("aria-expanded", "false");
            }
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && modal.style.display === "block") {
                modal.style.display = "none";
                openModalBtn.setAttribute("aria-expanded", "false");
            }
        });
    }

    // 6. FAQ Accordion
    const faqQuestions = document.querySelectorAll(".faq-question");
    faqQuestions.forEach(question => {
        question.addEventListener("click", function() {
            this.classList.toggle("active");
            let expanded = this.getAttribute("aria-expanded") === "true" || false;
            this.setAttribute("aria-expanded", !expanded);
            let answer = this.nextElementSibling;
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
