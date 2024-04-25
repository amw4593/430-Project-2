(() => {
    const showError = error => {
        document.getElementById("errorMessage").textContent = error;
        document.getElementById("postMessage").classList.remove("hidden");
    };

    const handleSubmit = async (url, data) => {
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            if (responseData.redirect) {
                window.location = responseData.redirect;
            } else if (responseData.error) {
                showError(responseData.error);
            }
        } catch (error) {
            showError("An error occurred while processing your request.");
        }
    };

    window.onload = () => {
        const signupForm = document.getElementById("signupForm");
        const loginForm = document.getElementById("loginForm");
        const postForm = document.getElementById("postForm");
        const errorMessage = document.getElementById("errorMessage");

        signupForm && signupForm.addEventListener("submit", async event => {
            event.preventDefault();
            errorMessage.classList.add("hidden");
            const username = signupForm.querySelector("#user").value;
            const password = signupForm.querySelector("#pass").value;
            const password2 = signupForm.querySelector("#pass2").value;
            if (!username || !password || !password2) {
                showError("All fields are required!");
                return false;
            }
            if (password !== password2) {
                showError("Passwords do not match!");
                return false;
            }
            handleSubmit(signupForm.getAttribute("action"), { username, password, password2 });
            return false;
        });

        loginForm && loginForm.addEventListener("submit", async event => {
            event.preventDefault();
            errorMessage.classList.add("hidden");
            const username = loginForm.querySelector("#user").value;
            const password = loginForm.querySelector("#pass").value;
            if (!username || !password) {
                showError("Username or password is empty!");
                return false;
            }
            handleSubmit(loginForm.getAttribute("action"), { username, password });
            return false;
        });

        postForm && postForm.addEventListener("submit", async event => {
            event.preventDefault();
            errorMessage.classList.add("hidden");
            const content = postForm.querySelector("#postContent").value;
            if (!content) {
                showError("Please enter something to post!");
                return false;
            }
            handleSubmit(postForm.getAttribute("action"), { content });
            return false;
        });
    };
})();
