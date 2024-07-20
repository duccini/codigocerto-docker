# base image do run the app
FROM node:20-alpine

# working directory
WORKDIR /app

# copy everything to the docker image. First . current directory on your machine. Second .
# path to the current directory whitin the container 
COPY . .

# command to run the app
CMD node hello.js

