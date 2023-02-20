FROM node:16

# Set app home directory
WORKDIR /home/app
COPY *.json *.js ./
COPY ./public ./public
COPY ./src ./src

# Allow node app to access database container
EXPOSE 5432