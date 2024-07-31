# Back-End Repo for Node/React Practicum

This will be the API for the front-end React app part of your practicum project.

These instructions are for the **front-end team** so they can setup their local development environment to run 
both the back-end server and their front-end app. You can go through these steps during your first group meeting 
in case you need assistance from your mentors.

>The back-end server will be running on port 8000. The front-end app will be running on port 3000. You will need to run both the back-end server and the front-end app at the same time to test your app.

### Setting up local development environment

1. Create a folder to contain both the front-end and back-end repos 
2. Clone this repository to that folder
3. Run `npm install` to install dependencies
4. Pull the latest version of the `main` branch (when needed)
5. Run `npm run dev` to start the development server
6. Open http://localhost:8000/api/v1/ with your browser to test.
7. Your back-end server is now running. You can now run the front-end app.

#### Running the back-end server in Visual Studio Code

Note: In the below example, the group's front-end repository was named `bb-practicum-team1-front` and the back-end repository was named `bb-practicum-team-1-back`. Your repository will have a different name, but the rest should look the same.
![vsc running](images/back-end-running-vsc.png)

#### Testing the back-end server API in the browser

![browser server](images/back-end-running-browser.png)

>Update the .node-version file to match the version of Node.js the **team** is using. This is used by Render.com to [deploy the app](https://render.com/docs/node-version).

#### Sonali's Steps Taken for branch "Sprint1Week1"
1) copy and paste README, app.js, server.js, mainController.js, mainRoutes.js files into userController.js and userRoutes.js file (replace user instead of main) other files from GG-PAC_TEAM3-BACK into GG-PAC_TEAM3-MONO directory

2) npm install ,npm install express, npm install express firebase-admin body-parser cors dotenv jsonwebtoken bcryptjs, npm install firebase,npm install morgan, npm install express-favicon, npm install axios


3) Did changes in .gitignore, app.js file on line 7 : changed mainRouter.js to userRoutes.js

4) created .env file , middleware, models folders.

5) Created database in Firebase. we choose option "start in test mode"

6) Generate Private key (Project setting => Serviece Account =? Firebase Admin SDK => Create service account => it will download .json file

7) added favicon.ico file 

8) Added GOOGLE_APPLICATION_CREDENTIALS, JWT_SECRET, FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN in .env file.

9) Did changes in userRoutes.js file

10) Dis changes in userController.js file

11) Did changes in app.js file

12) Did changes in firebase.js file

### Edith Steps Taken
* git fetch: to update clone local repo 
* checkout Sprint1Week1 to Sprint1Week1.2 new branch
* npm install
* npm start
* Add the Firebase Admin SDK service account JSON file to .gitignore    learninghub-ggpacteam3-firebase-adminsdk-zexw0-e7cfeb2116.json
* .env file in the root directory with the following content and Firebase sensitive data
* Update firebase.js to include process.env instead of storing senstive information
* Enable Email/Password Authentication in Firebase Console (Firebase Project>Authenthication>Signin Method)
* Postman server test: successfull
* Configure Firestore Database Rules(Ensure secure access control based on user roles.)
* Edit userRoutes, define routes for user-related operations.
* Created adminRoutes, define routes for admin-related operations.
* Edit userController to handle user-related operations like signup, login, and fetching user details.
* created adminController to handle admin-specific operations like creating and deleting users.
* Testing: Verified functionality using Postman, ensuring proper handling of authentication and authorization.

#### Sonali's Steps Taken for branch "Sprint1Week2.1"
* added resetPassword() and logoffUser(),updateUserProfile()  functionality in userController.js file.
* created team for backend in postman
* Created courseModel.js, courseRoutes.js, and courseController.js to create APIs for the Course.  
* Tested all requests in Postman 
* Added the userProfileImage.jpg image to the images folder in Firebase Storage and also added in public/images folder.