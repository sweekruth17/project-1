# Welcome to Support Ticket Entry System

Features of this Application

 - Create a new support agent with the specified attributes. 
 - Create anew support ticket with the specified attributes. 
 - API end pointsprovided by the backend systema are:
	 - POST /api/support-agents   
	 - POST /api/support-tickets   
	 - GET /api/support-tickets
 - Implemented round-robin assignment logic to assign a ticket to the next support agent. Change the status to Assigned when an agent is
   assigned

## To run frontend Part

 - cd frontend
 - npm i
 - npm run dev

## To run backend Part

 - cd Backend
 - npm i
 - npm run dev
 - Then to create schema in mongo DB : cd DB
 - node db.js

## I have deployed it in vercel:(but i have made the project dynamic and vercel supprts only static pages)
- link : https://project-1-shvasa.vercel.app/
- all screenshots link: https://docs.google.com/document/d/1ZeFagRgmbk8bVbBwGp0UYSIzOK21_3gh/edit?usp=sharing&ouid=101484451137896433394&rtpof=true&sd=true
