const helper = require('./helper.js');
const React = require('react');
const { createRoot } = require('react-dom/client');

const handleLogin = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;

    if (!username || !pass) {
        helper.handleError('Username or password is empty!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass });
    return false;
}

const handleSignup = (e) => {
    e.preventDefault();
    helper.hideError();

    const username = e.target.querySelector('#user').value;
    const pass = e.target.querySelector('#pass').value;
    const pass2 = e.target.querySelector('#pass2').value;

    if (!username || !pass || !pass2) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (pass !== pass2) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, { username, pass, pass2 });
    return false;
}

const handleChangePassword = (e) => {
    e.preventDefault();
    helper.hideError();

    const oldPassword = e.target.querySelector('#oldPass').value;
    const newPassword = e.target.querySelector('#newPass').value;
    const confirmPassword = e.target.querySelector('#confirmPass').value;

    if (!oldPassword || !newPassword || !confirmPassword) {
        helper.handleError('All fields are required!');
        return false;
    }

    if (newPassword !== confirmPassword) {
        helper.handleError('Passwords do not match!');
        return false;
    }

    helper.sendPost(e.target.action, { oldPassword, newPassword, confirmPassword });
    return false;
}

const LoginWindow = (props) => {
    return (
        <form id="loginForm"
            name="loginForm"
            onSubmit={handleLogin}
            action="/login"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <input className="formSubmit" type="submit" value="Sign in" />
        </form>
    );
};

const SignupWindow = (props) => {
    return (
        <form id="signupForm"
            name="signupForm"
            onSubmit={handleSignup}
            action="/signup"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="username">Username: </label>
            <input id="user" type="text" name="username" placeholder="username" />
            <label htmlFor="pass">Password: </label>
            <input id="pass" type="password" name="pass" placeholder="password" />
            <label htmlFor="pass">Password: </label>
            <input id="pass2" type="password" name="pass2" placeholder="retype password" />
            <input className="formSubmit" type="submit" value="Sign up" />
        </form>
    );
};

const ChangePasswordWindow = (props) => {
    return (
        <form id="changePasswordForm"
            name="changePasswordForm"
            onSubmit={handleChangePassword}
            action="/change-password"
            method="POST"
            className="mainForm"
        >
            <label htmlFor="oldPass">Old Password: </label>
            <input id="oldPass" type="password" name="oldPassword" placeholder="Old Password" />
            <label htmlFor="newPass">New Password: </label>
            <input id="newPass" type="password" name="newPassword" placeholder="New Password" />
            <label htmlFor="confirmPass">Confirm New Password: </label>
            <input id="confirmPass" type="password" name="confirmPassword" placeholder="Confirm New Password" />
            <input className="formSubmit" type="submit" value="Change Password" />
        </form>
    );
};

const init = () => {
    const loginButton = document.getElementById('loginButton');
    const signupButton = document.getElementById('signupButton');
    const changePasswordButton = document.getElementById('changePasswordButton');
    const changePasswordSelect = document.getElementById('changePasswordSelect');

    const root = createRoot(document.getElementById('content'));

    loginButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<LoginWindow />);
        return false;
    });

    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        root.render(<SignupWindow />);
        return false;
    });

    changePasswordButton.addEventListener('click', (e) => {
        e.preventDefault();
        const selectedValue = changePasswordSelect.value;
        if (selectedValue === 'changePassword') {
            root.render(<ChangePasswordWindow />);
        }
        return false;
    });

    root.render(<LoginWindow />);
};

window.onload = init;