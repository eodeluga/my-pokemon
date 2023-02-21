This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Running using Docker
If you have Docker (with Docker Compose) installed, simply enter the following
````
docker-compose up
````
You can now access the application using this url in your browser 
[http://localhost:3000](http://localhost:3000)

### Running using shell
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
