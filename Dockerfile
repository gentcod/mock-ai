FROM node:lts-alpine AS builder
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "start-prod"]
