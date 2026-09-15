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
