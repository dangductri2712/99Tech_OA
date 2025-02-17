# Title and description
This project is an online-assignment from 99Tech. It holds the 3 problems for Backend Developer including: 3 ways to sum, cruder server, and architecture

# The 3 questions:

### Question 1: Three way to sum to n
**Question's requirement**
With input n: number, writes 3 different iterations that products the exact result when returned. 

**Installation and run**
Inside the Backend/src/sum_to_n.ts file, there are already 3 console.log() which call the three function. To run this file, go to the Backend folder and run **tsc and node dist/sum_to_n.js** This way, we can convert the ts file into a js file and use node to run it. Outcome: You should see in the terminal, three exactly identical number. Feel free to change the number inside those functions to test

### Question 2: CRUDE server
**Question's requirement**
Develop a backend server with ExpressJS. You are required to build a set of CRUD interface that allow a user to interact with the service. You are required to use TypeScript for this task.
*Interface requirement*
1. Create a resource.
2. List resources with basic filters.
3. Get details of a resource.
4. Update resource details.
5. Delete a resource.

**Installation and run for backend**
Go to folder Backend and use npm install. This will install all dependencies necessary for the project. To run the Backend side, "cd Backend" from root directory and npm start. This will convert the index.ts and itemController.ts file into js for running.


**Installation and run for frontend**
Go to folder Frontend and use npm install. This has the same effect as Backend side. To run the Frontend side, use the command "cd Frontend/client" and press npm start. This will start the App.tsx file inside the client/src folder to run.

### Architecture:
**Requirement:**
Write the specification for a software module on the API service (backend application server) with the following software requirements:
1. We have a website with a score board, which shows the top 10 user’s scores.
2. We want live update of the score board.
3. User can do an action (which we do not need to care what the action is), completing this action will increase the user’s score.
4. Upon completion the action will dispatch an API call to the application server to update the score.
5. We want to prevent malicious users from increasing scores without authorization.

**Solution:**
1. For server, we can use the express, cors and body-parser first ro run on a specified port.

2. For database's item, we should have a table for 
- user (userID (primary_key), userFirstName, userLastName, userEmail, userPassword (hashed), userRole, userScore)


3. Controller file. This file will be the one to access the database and get what the user need. There should be first, userController 
- create new user(store their info into db with password hashed, and access and refresh token return to the client)
- getting the top 10 users with highest score, update the score  
- update the score. Remember to check for authorization and if the user can change the score themselves or not by checking the access token and the role in the db
4. Diagram to show the flow: [https://lucid.app/lucidchart/8c46ad42-be2d-433a-a63b-f16c11a4007b/edit?viewport_loc=-6%2C-465%2C1921%2C838%2C0_0&invitationId=inv_9fbd5c85-37fc-46d2-9b3f-085a43dfbd33]

5. Frontend:  We can have a state hook to check the score of the user. So when they do the action=> update the score, Frontend will fetch the info again and show the new score or we can simply reload the page via window.location.reload()

6. More on authorization. 
For starter, user should be defaulted as just "user", and not some special role like "admin". Secondly, every time, a new user sign up, beside storing into db, we can also send to them the refresh token and access token using jwt web token and sign in with a secret key. This way, along with the role in the db, we can know if they are authorized or not. And when the access token expired, then they can send a post request alongside the refresh token, we check that and resend them new access token. Let's say, if the client manage to find the API path to increase the score along with the compatible request's body , they will still need to provide the access token in order to be accepted.


