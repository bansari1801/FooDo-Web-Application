# Project

* This is a cloud based web application project called 'FooDo'. This application facilitates the restuarant management for the low and medium level restaurants who are looking to upgrade from conventional mode like pen and paper or from desktop clients. The app covers basic features like managing orders, viewing their history, kitchen side orders view, menu management, staff management, reviews, analytics and profile management. This application will help these small scale restaurants to use this one application and enhance their restauarant management experience to next level. 

* *Project URL*: https://magenta-creponne-eb2bea.netlify.app/
* *Git URL*: https://git.cs.dal.ca/bhshah/group_1_csci5709_4177
* *Backend URL*: https://group-1-backend.onrender.com

# Credentials to use the application.
email - byb@gmail.com
password - Byb@1234

## Getting Started


See deployment for notes on how to deploy the project on a live system.

### Prerequisites

To have a local copy of this lab / assignment / project up and running on your local machine, you will first need to install the following software / libraries / plug-ins

You will need to install any web browser (Chrome, Firefox etc).  
You will also need to install nodeJs.


### Installing

A step-by-step series of steps that tell you how to get a development env running:

1. Clone GIT repo

a. Firstly clone the GIT repository to your local machine.
b. Take the code of the main branch.

2. Install nodejs

a. Install nodejs from  https://nodejs.org/en/.

3. Run the application.

a.  Go to the directory of the app where package.json lies.
b.  Run the command "npm install". It will install dependencies. It will build the node_modules folder.
c.  Then run the command "npm start". It will run on localhost and you would be able to see the staff management page in the web browser.

4. Production-ready build.

a.  Run command "npm run build". It will create a build folder.

### To run the backend code,
1. Clone the git repo
2. go to the backend folder
3. run npm install to install the dependencies
4. run npm start to run the server

## Deployment

For deployment, frontend was deployed on netlify. Same steps were followed as they were in tutorial 2.
The backend is deployed in render.com

### Coding style tests

- W3 Complience check - Passed (Tested on this [site](https://validator.w3.org/))


## Built With

[React] (https://reactjs.org/) - The web framework.
[MaterialUI] ( https://mui.com) -Material UI library
[Node] (https://nodejs.org/en) - NodeJs
[Express] (https://expressjs.com/) - Express
[MongoDB] (https://www.mongodb.com/) - mongo db

## Sources Used

1. Official documentation of React at https://reactjs.org/docs/getting-started.html has been used for learning purposes to implement this web application in react.
2. Official documentation of Material with React at https://mui.com/material-ui/getting-started/overview/ has been used for learning purposes to implement the web page's styling and components. Used various components of material like select, textfield, checkbox, table, pagination, Grid, Container, Appear, Box, Paper etc.
3. For form validation, formik has been used. For the reference https://formik.org/docs/examples/with-material-ui. 
4. For date picking component , react date range was used athttps://www.npmjs.com/package/react-date-range. 
5. For telephone number country code, mui-tel-input package was used at https://www.npmjs.com/package/mui-tel-input 
6. For validation in some forms, resolver was used from the https://www.npmjs.com/package/@hookform/resolvers 
8. For mongodb crud - https://www.dotnettricks.com/learn/react/mern-stack-crud-operations-example
9. For configuring redux - https://www.freecodecamp.org/news/how-to-build-a-redux-powered-react-app/
10. For implementing jwt - https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/
11. For creating toast messages - https://mui.com/material-ui/react-snackbar/
12. For updating child object in mongo document - https://www.mongodb.com/community/forums/t/updating-a-nested-object-in-a-document-using-mongoose/141865
13. For accessing redux state - https://iq.js.org/questions/react/how-to-access-redux-store-outside-a-component
14. formik dynamic array - https://medium.com/@deshan.m/yup-formik-dynamic-array-of-object-form-validation-ed0afed3d886
15. delete docuement from mongodb - https://www.mongodb.com/docs/manual/tutorial/remove-documents/
16. add key value pair in array - https://stackoverflow.com/questions/39827087/add-key-value-pair-to-all-objects-in-array
17. formik custom onChange - https://stackoverflow.com/questions/66744999/override-formik-onchange-with-custom-onchange-method-in-reactjs
18. search API for mulitple fields - https://stackoverflow.com/questions/36568585/how-to-construct-query-to-filter-by-pairs-of-keys-in-mongodb
19. API call at page load - https://stackoverflow.com/questions/67670799/react-js-call-api-on-page-load
20. mongo search query - https://stackoverflow.com/questions/72989213/…


