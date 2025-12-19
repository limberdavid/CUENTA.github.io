const form = document.getElementById("registrationForm");
const inputs = form.querySelectorAll("input");
const meterBar = document.getElementById("meterBar");
const meterText = document.getElementById("meterText");
const toast = document.getElementById("toast");

inputs.forEach(input => {
    input.addEventListener("input", () => validate(input));
    if (input.id === "password") {
        input.addEventListener("input", () => passwordStrength(input.value));
    }
});

function validate(input) {
    const group = input.closest(".form-group") || input.closest(".terms");
    const error = group.querySelector(".error");

    if (input.id === "confirmPassword") {
        const pwd = document.getElementById("password").value;
        if (input.value !== pwd) {
            setError(input, error, "Las contraseñas no coinciden");
            return false;
        }
    }

    if (!input.checkValidity()) {
        setError(input, error, "Campo inválido");
        return false;
    }

    setSuccess(input, error);
    return true;
}

function setError(input, error, msg) {
    input.classList.add("invalid");
    input.classList.remove("valid");
    error.textContent = msg;
}

function setSuccess(input, error) {
    input.classList.remove("invalid");
    input.classList.add("valid");
    error.textContent = "";
}

function passwordStrength(pwd) {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    meterBar.style.width = (score * 25) + "%";

    if (score <= 1) {
        meterBar.style.background = "#ff5252";
        meterText.textContent = "Fuerza: Débil";
    } else if (score <= 3) {
        meterBar.style.background = "#ffc107";
        meterText.textContent = "Fuerza: Media";
    } else {
        meterBar.style.background = "#00e676";
        meterText.textContent = "Fuerza: Fuerte";
    }
}

form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;

    inputs.forEach(i => {
        if (!validate(i)) valid = false;
    });

    if (!document.getElementById("terms").checked) {
        valid = false;
        document.querySelector(".terms .error").textContent = "Debes aceptar los términos";
    }

    if (valid) {
        showToast("¡Registro exitoso!");
        form.reset();
        meterBar.style.width = "0";
        meterText.textContent = "Fuerza: -";
        inputs.forEach(i => i.classList.remove("valid"));
    }
});

function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}
