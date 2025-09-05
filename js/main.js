"use strict";
// --- DOM Shortcuts ---
console.log("yawa");
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
    const nameInput = mustExist($("#fullname"), "#fullname");
    const emailInput = mustExist($("#email"), "#email");
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
        name: mustExist($(".nameIndicator"), ".nameIndicator"),
        email: mustExist($(".emailIndicator"), ".emailIndicator"),
        password: mustExist($(".passwordIndicator"), ".passwordIndicator"),
        confirm: mustExist($(".confirmPasswordIndicator"), ".confirmPasswordIndicator"),
    };
    // --- Validators ---
    const validateName = (name) => name.trim().length < 3 ? "Name must be at least 3 letters." : null;
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? null : "Invalid email format.";
    const validatePassword = (password) => {
        if (password.length < 8)
            return "At least 8 characters required.";
        if (!/[A-Z]/.test(password))
            return "At least 1 uppercase letter required.";
        if (!/[a-z]/.test(password))
            return "At least 1 lowercase letter required.";
        if (!/[0-9]/.test(password))
            return "At least 1 number required.";
        return null;
    };
    const validateConfirmPassword = (password, confirm) => password === confirm ? null : "Passwords do not match.";
    // --- UI Feedback ---
    function showFeedback(indicator, help, error) {
        if (error) {
            indicator.textContent = "❌";
            indicator.style.color = "red";
            help.textContent = error;
        }
        else {
            indicator.textContent = "✅";
            indicator.style.color = "green";
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
    // --- Prevent accidental bypass ---
    const form = mustExist($("#signupForm"), "#signupForm");
    form.addEventListener("submit", (e) => {
        if (submitBtn.disabled)
            e.preventDefault();
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
//# sourceMappingURL=main.js.map