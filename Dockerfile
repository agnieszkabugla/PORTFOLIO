# Base image for building
FROM node:9.4 AS build

# Let's copy everyting inside docker
RUN mkdir -p /app
COPY . /app

# let's change working directory to /app
WORKDIR /app

RUN npm install
RUN npm run build

FROM node:9.4-alpine as production

RUN mkdir -p /app

WORKDIR /app

COPY --from=build /app/package.json /app
COPY --from=build /app/package-lock.json /app

COPY --from=build /app/dist /app/dist

RUN npm install --production

CMD [ "node", "/app/dist/distServer.js" ]
