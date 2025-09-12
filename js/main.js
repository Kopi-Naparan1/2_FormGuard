"use strict";
// --- DOM Shortcuts ---
const $ = (sel) => document.querySelector(sel);
// --- Helper to assert element existence ---
function mustExist(el, name) {
    if (!el)
        throw new Error(`${name} not found`);
    return el;
}
// --- Form Validation ---
function initFormValidation() {
    // Inputs & Button
    const emailInput = mustExist($("#email"), "#email");
    const nameInput = mustExist($("#fullname"), "#fullname");
    const passwordInput = mustExist($("#password"), "#password");
    const confirmInput = mustExist($("#confirmPassword"), "#confirmPassword");
    const submitBtn = mustExist($("#submitBtn"), "#submitBtn");
    // Help elements
    const nameHelp = mustExist($("#fullnameHelp"), "#fullnameHelp");
    const emailHelp = mustExist($("#emailHelp"), "#emailHelp");
    const passwordHelp = mustExist($("#passwordHelp"), "#passwordHelp");
    const confirmHelp = mustExist($("#confirmHelp"), "#confirmHelp");
    // Status indicators
    const indicators = {
        name: mustExist($(".indicator.nameIndicator"), ".nameIndicator"),
        email: mustExist($(".indicator.emailIndicator"), ".emailIndicator"),
        password: mustExist($(".indicator.passwordIndicator"), ".passwordIndicator"),
        confirm: mustExist($(".indicator.confirmPasswordIndicator"), ".confirmPasswordIndicator"),
    };
    // --- Validators ---
    const validateName = (name) => name.trim().length < 3 ? "Too short" : null;
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? null : "Invalid";
    const validatePassword = (password) => {
        const score = calculatePasswordStrength(password);
        if (password.length < 8)
            return "Too short";
        if (!/[A-Z]/.test(password))
            return "Missing uppercase";
        if (!/[a-z]/.test(password))
            return "Missing lowercase";
        if (!/[0-9]/.test(password))
            return "Missing number";
        if (score < 50)
            return "Password too weak";
        return null;
    };
    // --- Password strength & confirm validation ---
    passwordInput.addEventListener("input", () => {
        // Strength meter logic
        if (passwordInput.value.length === 0) {
            pwStrength.style.display = "none";
        }
        else {
            pwStrength.style.display = "flex";
            const score = calculatePasswordStrength(passwordInput.value);
            updateStrengthUI(score, pwLine, pwText);
        }
        // // Revalidate confirm password
        // showFeedback(
        //   indicators.confirm,
        //   confirmHelp,
        //   validateConfirmPassword(passwordInput.value, confirmInput.value)
        // );
        checkFormValidity();
    });
    const validateConfirmPassword = (password, confirm) => password === confirm ? null : "Mismatch";
    // --- UI Feedback ---
    function showFeedback(indicator, help, error) {
        const icon = indicator.querySelector("i");
        if (!icon)
            return;
        icon.classList.remove("fa-check", "fa-xmark");
        if (error === null) {
            icon.classList.add("fa-xmark");
            icon.style.color = "#ffd60a";
            help.textContent = error;
        }
        else {
            icon.classList.add("fa-check");
            icon.style.color = "#ffd60a";
            help.textContent = "";
        }
    }
    // --- Form validity check ---
    function checkFormValidity() {
        const isNameValid = validateName(nameInput.value) === null;
        const isEmailValid = validateEmail(emailInput.value) === null;
        const isPasswordValid = validatePassword(passwordInput.value) === null;
        const isConfirmValid = validateConfirmPassword(passwordInput.value, confirmInput.value) === null;
        submitBtn.disabled = !(isNameValid &&
            isEmailValid &&
            isPasswordValid &&
            isConfirmValid);
    }
    // --- Real-time validation ---
    function setupRealtimeValidation() {
        const inputs = [
            {
                input: nameInput,
                indicator: indicators.name,
                help: nameHelp,
                validator: validateName,
            },
            {
                input: emailInput,
                indicator: indicators.email,
                help: emailHelp,
                validator: validateEmail,
            },
            {
                input: passwordInput,
                indicator: indicators.password,
                help: passwordHelp,
                validator: validatePassword,
            },
            {
                input: confirmInput,
                indicator: indicators.confirm,
                help: confirmHelp,
                validator: (val) => validateConfirmPassword(passwordInput.value, val),
            },
        ];
        inputs.forEach(({ input, indicator, help, validator }) => {
            input.addEventListener("input", () => {
                showFeedback(indicator, help, validator(input.value));
                checkFormValidity();
            });
        });
    }
    submitBtn.addEventListener("click", () => {
        window.location.href =
            "https://kopi-naparan1.github.io/1_Nyro-Portfolio-Website/";
    });
    // --- Prevent accidental bypass ---
    const form = mustExist($("#signupForm"), "#signupForm");
    form.addEventListener("submit", (e) => {
        if (submitBtn.disabled)
            e.preventDefault();
    });
    let view_pwd = mustExist($(".view-password"), ".view-password");
    let unview_pwd = mustExist($(".unview-password"), ".unview-password");
    let view_confirm_pwd = mustExist($(".view-confirm-password"), ".view-confirm-password");
    let unview_confirm_pwd = mustExist($(".unview-confirm-password"), ".unview-confirm-password");
    view_pwd.addEventListener("click", () => {
        // Hide "view" icon, show "unview" icon
        view_pwd.style.display = "none";
        unview_pwd.style.display = "block";
        // Switch input to plain text
        passwordInput.type = "text";
    });
    unview_pwd.addEventListener("click", () => {
        // Hide "unview" icon, show "view" icon
        unview_pwd.style.display = "none";
        view_pwd.style.display = "block";
        // Switch input back to password
        passwordInput.type = "password";
    });
    view_confirm_pwd.addEventListener("click", () => {
        view_confirm_pwd.style.display = "none";
        unview_confirm_pwd.style.display = "block";
        confirmInput.type = "text";
    });
    unview_confirm_pwd.addEventListener("click", () => {
        unview_confirm_pwd.style.display = "none";
        view_confirm_pwd.style.display = "block";
        confirmInput.type = "password";
    });
    // --- Initialize ---
    setupRealtimeValidation();
    // Show initial feedback
    showFeedback(indicators.name, nameHelp, validateName(nameInput.value));
    showFeedback(indicators.email, emailHelp, validateEmail(emailInput.value));
    showFeedback(indicators.password, passwordHelp, validatePassword(passwordInput.value));
    showFeedback(indicators.confirm, confirmHelp, validateConfirmPassword(passwordInput.value, confirmInput.value));
    checkFormValidity();
}
initFormValidation();
// TO ORGANZE
// --- Strength Meter Helpers ---
// Calculate password strength (0–100)
function calculatePasswordStrength(password) {
    let score = 0;
    // --- Length (max 50 pts) ---
    if (password.length >= 8)
        score += 20;
    if (password.length >= 12)
        score += 35;
    if (password.length >= 16)
        score += 50;
    // --- Character variety (max 30 pts) ---
    if (/[a-z]/.test(password))
        score += 5;
    if (/[A-Z]/.test(password))
        score += 5;
    if (/[0-9]/.test(password))
        score += 10;
    if (/[^a-zA-Z0-9]/.test(password))
        score += 10;
    // --- Pattern penalties ---
    if (/^(.)\1+$/.test(password))
        score -= 20; // all same char
    if (/1234|abcd|qwerty/i.test(password))
        score -= 15; // common sequences
    if (/password|letmein|admin/i.test(password))
        score -= 10; // weak words
    // --- Bonus ---
    if (password.length >= 20 &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[0-9]/.test(password)) {
        score += 10;
    }
    // Clamp to [0, 100]
    return Math.max(0, Math.min(100, score));
}
// Update UI
function updateStrengthUI(score, pwLine, pwText) {
    // Map score → width (max 100px)
    pwLine.style.width = `${score}%`;
    if (score < 30) {
        pwLine.style.backgroundColor = "#ffc40078";
        pwText.textContent = " ";
    }
    else if (score < 60) {
        pwLine.style.backgroundColor = "#ffc400e7";
        pwText.textContent = " ";
    }
    else if (score < 80) {
        pwLine.style.backgroundColor = "#ffc40078";
        pwText.textContent = " ";
    }
    else {
        pwLine.style.backgroundColor = "#ffc40078";
        pwText.textContent = " ";
    }
}
// --- DOM hookups ---
let pwStrength = mustExist($(".pw-strength"), ".pw-strength");
let pwLine = mustExist($(".line"), ".line");
let password = mustExist($("#password"), "#password");
let pwText = mustExist($(".pw-strength-text"), ".pw-strength-text");
// Hide initially if empty
if (password.value.length === 0) {
    pwStrength.style.display = "none";
}
//# sourceMappingURL=main.js.map