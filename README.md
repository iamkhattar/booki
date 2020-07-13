# Booki

A modern application to facilitate book groups

## Documentation

Documentation for Booki can be viewed [here]().

## Installation Instructions

### Prerequisites

Before installing "Booki", please ensure that the following software is installed on the system. Additional Dependencies will install automatically on completing the next steps.

1. Git
2. Node.js v12.13+
3. Npm v6.12+
4. MongoDB v4.2.2+ or a MongoDB Atlas Account

### Downloading the Repository

The Booki Repository is available on Github. To clone the repository, navigate to the folder where the repository is to be installed and use the following command:

```bash
  git clone https://github.com/iamkhattar/booki
```

### Preparation

Before using the project, you must prepare the project. To prepare the project, please create a file called _default.json_ under _/config_. Then populate the file like this:

```javascript
{
  "mongoURI": "MONGODB_URI",
  "jwtToken": "JWT_SECRET_TOKEN"
}
```

### Installing Server Dependencies

The server requires additional dependencies to be installed on the system to function as intended. To install these dependencies, use the following command in the root directory

```bash
  npm install
```

## Running Instructions

### Running the Server in Development Mode

The server will restart automatically if any changes are made in development mode. To run the server in development mode, use the following command in the root directory:

```bash
  npm run server
```
