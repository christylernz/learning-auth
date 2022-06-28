const client_id = '702269871560-c4lmbm1t9cdlq4ce7otvjjltsrt3lg1c.apps.googleusercontent.com';


function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    const responsePayload = jwtDecode(response.credential);

    console.log("JWT: " + JSON.stringify(responsePayload));
    console.log("Response" + JSON.stringify(response));
    document.getElementById("message-area").textContent = "User " + responsePayload.name + " Signed In";
}

function jwtDecode(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};