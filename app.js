import googleAuth from "./google-auth.js";

const client_id = '702269871560-c4lmbm1t9cdlq4ce7otvjjltsrt3lg1c.apps.googleusercontent.com';



function main() {
    googleAuth.load(client_id);
    const signout = document.getElementById('signout');
    signout.style.display = 'none';
    const signout_btn = document.getElementById('signout_button');
    const revoke_btn = document.getElementById('revoke_button');
    googleAuth.showSignin('signin', {type: 'standard', size: 'large', text: 'signup_with'});
}

main();