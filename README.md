# REST API Assignment

A very clean, secure and extendable REST API server. I have used Express and Mongoose along with other packages and modern JavaScript features.

## Install
I have used yarn as my package manager. To install the dependecies run:

```bash
yarn install
```

command inside the project folder.

Set the environment variables:

```bash
cp .env.example .env
```

Open the .env file and add the database connection string and modify other values as needed.

## Running the project
To run the project in development mode use:

```bash
yarn dev
```

Running in production (uses pm2 for process management):

```bash
yarn start
```

## Validation
To ensure data integrity. Input validation is implemented in two places:

* Before the request object is passed to the resource controller
* In the data layer

## Project Structure
```
src\
 |--config\         # Environment variables and configurations
 |--constants\      # Project constants
 |--controllers\    # Resource controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--utility\        # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # Entry point
 ```