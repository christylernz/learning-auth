# learning-auth
repo for learning authentication and authorization 

Background
I wrote this in order to understand how to use Google's New Identity Services (https://developers.google.com/identity/gsi/web) in order to access a users identity and
then use that id to access the Google API (mainly for accessing tasks and calendar for another project).

I read a number of resources on the subject, but really struggled to understand them. The closest I found to a good explanation was https://overclocked.medium.com/seamless-api-access-with-google-identity-services-b9901009a8ce however as this had been written to use a library that the author wrote called gothic (https://github.com/overclocked/gothic), there was still some complexity that didn't make sense to me. So I've written this to remove the complexity and do a basic authentication. This repository will be updated with the authorization components at a later date.

The first confusion, which the medium article was helpful in resolving was that authentication and authorization are separated from each other but also part of the same library. This caused some confusion as the separation isn't obvious from the google documentation. 


You will need to set up the client id using the Google API Services.



The steps to getting the Identity Services working are

1. Import the google library
2. after loaded initialize (and show the signin button/one tap)
3. user clicks the button or one tap
4. user signs in
5. JWT is returned
6. store state (don't store JWT as this will allow XSS or CSRF attacks)

Then this can be later used for authorization of Google API (this will be added later)
