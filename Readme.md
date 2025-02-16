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
- soccer teams (teamID(primary_key), teamName, teamCaptain)
- competeDate(dateID(primary_key), dateTime, matchID)
- matches(matchID(primary_key), team1ID, team2ID, team1Score, team2Score)

3. Controller files. These files will be the one to access the database and get what the user need. There should be first, userController (getting the users' info, update the score and check for authorization and if the user can change the score themselves or not), matchController (getting the info on the live matches by implementing outside's API and insert more info into other databases like the matches table)
4. Flowchart [https://lucid.app/lucidchart/8c46ad42-be2d-433a-a63b-f16c11a4007b/edit?viewport_loc=-6%2C-465%2C1921%2C838%2C0_0&invitationId=inv_9fbd5c85-37fc-46d2-9b3f-085a43dfbd33]


