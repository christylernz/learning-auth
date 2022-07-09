
export default {
    load,
    showSignIn,
    showSignOut,
    getAuthState
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
    _load_libraries();
}

function showSignIn(parent_id, params = {})
{
    const ctr = document.getElementById(parent_id);
    if (!ctr) {
        throw(new Error(`No container for signin button: '${parent_id}' `));
    }

    const options = {
        type:  'standard',
        theme: 'outline',
        size:  'medium',
        shape: 'pill',
        ...params,
    };

    google.accounts.id.renderButton(
        ctr,
        options
    ); 
}


// function for getting the authentication state
function getAuthState() {
    return state.prev
}

// function for displaying sign out buttons
function showSignOut()
{
    document.getElementById('signin').style.display = 'none';
    document.getElementById('signout').style.display = 'block';
    document.getElementById('error').style.display = 'none';
}

// function for displaying error message
function showError()
{
    document.getElementById('signin').style.display = 'none';
    document.getElementById('signout').style.display = 'none';
    document.getElementById('error').style.display = 'block';
}



//private functions

// load all dependencies and attach to html page
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
            //if Google Identity services is ready - check the state of authentication (has the user signed in already)
            if (getAuthState()) {
                showSignOut()
            } else {
                showSignIn('signin', {type: 'standard', size: 'large', text: 'signup_with'});
            }
            pass();
        }
    }

    // When Google Authentication is loaded then initialise
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
    const authscript = document.createElement('script');
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


//success authentication call back.
async function _on_response(response) {
    state.user = null;
    let event_type = 'unknown';
    if (response && response.credential) {
        try {
            let rawdata = _jwtDecode(response.credential);
            // use arrow function with object literal to filter raw data and get result.
            state.user = (
                (
                    {
                        email,
                        family_name,
                        given_name,
                        picture,
                        name
                    }
                ) => (
                    {
                        email,
                        family_name,
                        given_name,
                        picture,
                        name
                    }
                )
            )(rawdata);
            window.localStorage.setItem('google-auth-id','loaded');
            console.log('success');
            console.log(JSON.stringify(state.user));
            showSignOut();
        } catch (err) {
            console.log(err);
            showError();
        }
    }
}

function _jwtDecode(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};