'use strict';

const toggleBlocks = () => {
    document.querySelector('.js-login-block').classList.toggle('hidden');
    document.querySelector('.js-signup-block').classList.toggle('hidden');
};

const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const resData = await response.json();

            alert(`${response.statusText}\n${resData.message ? resData.message : ''}`);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const firstName = document.querySelector('#signup-first-name').value.trim() || null;
    const lastName = document.querySelector('#signup-last-name').value.trim() || null;
    const email = document.querySelector('#signup-email').value.trim();
    const password = document.querySelector('#signup-password').value.trim();

    if (password.length < 8) {
        alert('Password must be at least 8 characters');
        document.querySelector('#signup-password').focus();

        return;
    }

    if (email && password) {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            const resData = await response.json();

            alert(`${response.statusText}\n${resData.message ? resData.message : ''}`);
        }
    }
};

const initLogin = () => {
    document.querySelectorAll('.js-login-block-toggle').forEach(elem => elem.addEventListener('click', toggleBlocks));
    document.querySelector('.js-login-form').addEventListener('submit', loginFormHandler);
    document.querySelector('.js-signup-form').addEventListener('submit', signupFormHandler);
};

initLogin();
