# Base image for building
FROM node:9.4

# Let's copy everyting inside docker
RUN mkdir -p /app
COPY . /app

# let's change working directory to /app
WORKDIR /app

RUN npm install

CMD [ "npm", "run", "build" ]
