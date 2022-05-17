Coding Challenge Tech Test by React Web Developer Lee Allen.

Original Backend from not working due to CORS not being bypassed with http-proxy-middleware so, as a solution I have installed json-server into the front-end to avoid CORS browser security. 

To run Json-Server-API installed in the frontend please do the following.

From Root:

cd client && npm install && npm run server

API and JSON will be accessible on http://localhost:5000

To create a build folder:

npm run build, this will create a folder ready for deployment.

Running the Frontend Interface:

npm start

The Frontend interface will be accessible on http://localhost:3000

Successful API connection and GET request will show a '200 status' in the console.

Clicking on the 'ADD NOTE' button will provide a form for a new 'note/todo'.

To submit a note, a note is required in the 'note feild', this may be NO MORE than 500 characters. These are mandatory or an error mesage will be displayed in either case.

Optional filter for the last 6 months will be displayed when clicking on the 'Last 6 Months' toogle button in the header of the app.

This application is also accessible on mobile devices also.

