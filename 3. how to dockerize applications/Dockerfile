FROM node:14.17.6-alpine3.13
WORKDIR /react-app
COPY . .
CMD cd app
RUN npm install
EXPOSE 3000
RUN addgroup app && adduser -S -G app app
USER app