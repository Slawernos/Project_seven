Required software to run backend server:

Step 1.
Download PGSQL
https://www.postgresql.org/download/

Step 2.
Create a database in postgres after insallation and name it accordingly.
Import database from Project_seven.sql

Step 3. Setup server settings
Server settings can bee found in /backend/.env file settings follows as:

DATABASE_URL= localhost   --> server address for SQL
DATABASE_PASSWORD = root  --> password for sql server 
DATABASE_USERNAME = postgres --> username for sql server
DATABASE_DATABASE = users -> Database name from step 2.
PORT = 5050 -> port number
SUPERSECRET = THIS_IS_A_TEST_BUT_IT_S_SUPER_SECRET_TOKEN --> Token for passwords!

Step 4.
install the backend server via npm install command from backup folder
installl the frontend server via npm install command from frontend folder.


To run server
Run command npm start from backend folder and npm start from frontend folder.



