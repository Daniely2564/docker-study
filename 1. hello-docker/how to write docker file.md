# How to write Dockerfile

## Basic Creation

Dockerfile is a instruction for packaging our application. The way we write Dockerfile is by copying the base image.

1. Start from `FROM` and

```Dockerfile
FROM [image]
```

Example

```Dockerfile
FROM node:[version]
```

```Dockerfile
FROM linux:[version]
```

2. Copy instruction

Copying is needed

```Dockerfile
COPY . /app
```

The above code tells us to copy the "." entire files in the directory to /app. In the filesystem, I am going to create a directory, /app

3. Commands

Execute a command.

```Dockerfile
CMD node ./app/app.js
```

Alternatively, we can change the directory using `WORKDIR`

```Dockerfile
FROM node:alpine
COPY . /app
WORKDIR /app
CMD node app.js
```

4. Build command.

```sh
docker build -t hello-docker .
```

`-t` : tag name

## Docker Commands

Once docker image is created, it is not saved locally but is saved inside of docker.

In order to see docker images, we can use either of two methods

```sh
docker image ls
docker images
```
