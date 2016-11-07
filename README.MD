# MUSIKKI FAVORITES WEBAPP IN [REACT]

This is a webapp created in [React] for exercise purposes only, where you can search for artists and and make them your favorites, accessing them later based on your browser localStorage information related to your user. To start using it just follow the [Local Setup](#local-setup) steps.

## Local Setup
- We assume that you have already `node` installed, otherwise follow [installation process](https://nodejs.org/);
- Install all the dependencies with `sudo npm install` (based on `package.json`);
- Enter the webapp folder and start the App by running `npm start`;

## App Information
This app is divided in four main parts as described bellow.

### Home
Here you can find a carousel with some images and information related with the app.

![alt text](/../master/src/screenshots/screenshot_00.png?raw=true "Home")

### Register
Accessing register view you can create an account based on an username and a password with some validations related to the inputs inserted.

![alt text](/../master/src/screenshots/screenshot_01.png?raw=true "Register")

### Login
Accessing login view you can login to an existing account inserting your username and password, there are some validations related to the inputs inserted.

![alt text](/../master/src/screenshots/screenshot_02.png?raw=true "Login")

### Search
You can only access this view after being logged in, otherwise you are going to be redirected to login view. When logged in with success you can search for your favorite artists and add/remove them as favorites by clicking the star on it.

![alt text](/../master/src/screenshots/screenshot_03.png?raw=true "Search")

![alt text](/../master/src/screenshots/screenshot_04.png?raw=true "Favorites")

### Other Notes
Whenever you enter a wrong url you are redirected to an 404 page.

## License
[MIT](/../master/LICENSE.MD)
