# My Pokemon
This is a little web application that presents Pokemon as cards and allows you to filter them by height and weight

## Getting Started

### Running using Docker
If you have Docker (with Docker Compose) installed on your system, simply enter the following in the project root folder
````
docker-compose up
````
You can now access the application using this url in your browser 
[http://localhost:3000](http://localhost:3000)

### Running using shell (manual setup)
This will require that PostgreSQL is installed, and the user name and password in .env file will need to be changed to match your environment

1. First create the database required by the application
````
sudo -u postgres psql -c 'create database pokemon;'
````

2. Then enter the following commands
````
npm install
npm run seed
npm run generate
npm run build
npm start
````

You can now access the application using this url in your browser 
[http://localhost:3000](http://localhost:3000)
