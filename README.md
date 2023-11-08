- Signup -

1. New User can signup and set password with realtime constraint errors, there are no constraints on email and username.
2. Password visible on button click.
3. Loading animation on clicking signup button.
4. Password is encrypted using bcrypt and then stored in database. All other fields are stored as it is in database with some additional info.
5. Redirect to login page after succesful signup.
6. If email already exists in database then convyed on frontend to login.

- Login -

1. Existing user can login.
2. Password visible on button click.
3. Loading animation on clicking login button.
4. Link to redirect to signup page.
5. Checking for email and password(password stored in database is decrypted before checking) and message displayed for invalid credentials.
6. Generate Token on backend using jwt and email,username,\_id and store the token as cookies on client browser with 1 day expiry.

- Middleware -

1. Doesn't allow to visit "/login" , "/signup" if already logged in using token and redirected to "/".
2. Doesn't allow to visit "/profile" if not logged in and redirectd to "/login".
