
export default {
    load
};

let google;

const state = {
    prev: false,
    loaded: false,
    cid: null,
    user: null
};

const obs = [];

//public functions

function load(client_id) {
    state.cid = client_id;
    state.prev = window.localStorage.getItem('google-auth-id') ? true : false;
    
}

//private functions

function _load_libraries() {
    let auth_ready = false; //is the Google Identity Services Loaded

    // Functions for resolving and rejecting Promise
    let pass;
    let fail;

    // Promise that stores the resolve and reject functions as variables that are accessed via pass() or fail() elsewhere
    let ready = new Promise((resolve,reject) => {
        pass = resolve;
        fail = reject;
    }); 
    
    // Method that will resolve() promise if all checks are completed
    function _check_ready() {
        if (auth_ready) {
            pass();
        }
    }

    // When Google Authentication is read then initialise
    function _auth_ready() {
        google = window.google;
        google.accounts.id.initialize({
            client_id: state.cid,
            auto_select: true,
            callback: _on_response
        });
        auth_ready = true;
        _check_ready();
    }


    //Load Google Identity services
    const authscript = document.createElement(script);
    authscript.type = 'text/javascript';
    authscript.src = 'https://accounts.google.com/gsi/client';
    authscript.defer = true;
    authscript.async = true;
    authscript.onload = _auth_ready;
    authscript.onerror = fail;
    document.getElementsByTagName('head')[0].appendChild(authscript); 

    //return the promise so that that load method can be chained with .then() and .catch()
    return ready;
}

async function _on_response(r) {

}

function _jwtDecode(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};