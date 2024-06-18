# DataVid Cake Tracker (Internship Submission)

## Introduction

This project consists of a front-end application built with React and a back-end application built with Node.js and TypeScript. The project uses Docker to containerize the applications for ease of development and deployment.

## Prerequisites

Before running the project, ensure you have the following installed and set up on your machine:

1. **Docker Desktop**: Download and install Docker Desktop from [here](https://www.docker.com/products/docker-desktop).
2. **Free Ports**: Ensure that the following ports are free:
   - `3000`: Used by the back-end application.
   - `4000`: Used by the front-end application.
   - `5432`: Used by the PostgreSQL database.

## Getting Started

Follow these steps to get the project up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/ilikekratos/datavidcake
cd datavidcake
```

### 2. Run docker

```bash
docker compose up --build -d
```
### 3. Access localhost:4000 and login with credentials:

```bash
username:admin
password:admin
```
### In-app images:
![Login](Login.jpg)
![Add](Add.jpg)
![View](View.jpg)

### Solution design:

A restAPI server has been created in NodeJS, linked to a PostgreSQL database containing our only entity Employee. This entity is generated by Typeorm and the unique constraint is that the combination firstName,lastName,city should be unique. The NodeJS server also takes care of a mock-up login that is meant to use JWToken. 

The frot-end is based on a React app in which one can add/view/delete employees.