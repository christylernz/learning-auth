
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
    
    function _all_ready() {
        if (auth_ready) {
            pass();
        }
    }


    //Load Google Identity services
    const authscript = document.createElement(script);


    //return the promise so that that load method can be chained with .then() and .catch()
    return ready;
}

function _jwtDecode(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};