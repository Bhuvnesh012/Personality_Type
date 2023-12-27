Quiz Automation Documentation
Overview
The Quiz Application is a web-based personality quiz that allows users to answer a set of questions and receive a personality type based on their responses. The application consists of a frontend HTML/CSS/JavaScript interface, a Node.js server for handling quiz submissions, and a PostgreSQL database to store quiz data.
Project Structure
The project is structured into three main components:
Frontend: Contains HTML, CSS, and JavaScript files for the user interface.
Files: index.html, quizz.css, quiz.js
Backend Server (Node.js): Handles quiz submissions and communicates with the PostgreSQL database.
Files: server.js
Dependencies: express, body-parser, pg, cors
Database (PostgreSQL): Stores user information, quiz responses, and quiz results.
Database Name: quizdb
Tables: users, quiz_responses, quiz_results
Setup Instructions
Prerequisites
Node.js installed
PostgreSQL installed
Steps
Database Setup:
Create a PostgreSQL database named quizdb.
Execute the SQL queries in database.sql to create the required tables.
Backend Server Setup:
Install Node.js dependencies: npm install.
Configure the PostgreSQL connection in server.js.
Run the server: node server.js.
Frontend Setup:
Open index.html in a web browser.
API Endpoints
Submit Quiz API:
Endpoint: POST /submitQuiz
Request Body: JSON object containing name, email, responses, and result.
Submits quiz data to the server and stores it in the database.
Fetch All Quiz Data API:
Endpoint: GET /fetchAllQuizData
Fetches all quiz data from the database.
Frontend Logic
Users answer personality quiz questions and submit their responses.
The frontend calculates a quiz result based on the responses.
The result, along with user details, is sent to the server using the Submit Quiz API.
Backend Logic
The server receives quiz submissions and stores them in the PostgreSQL database.
Provides an API endpoint to fetch all quiz data from the database.
Additional Notes
Customize the quiz questions and result calculation logic in the frontend (quiz.js).
Adjust the database schema and queries based on your specific requirements.
Future Improvements
Implement user authentication for personalized quiz results.
Enhance frontend design for a more engaging user experience.
Add more customization options for quiz questions and results.
Feel free to tailor this documentation to better suit your project's specific details and requirements.

