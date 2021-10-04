# How to deploy react app

1. First add a docker file.

A **Dockerfile** contains instructions for building an image.

`FROM` - Specifying the base image.
`WORKDIR` - Specify working directory
`COPY` - Copy directory
`ADD` - Add directories
`RUN` - Executing operation commands (For windows run windows commands and so on.)
`ENV` - Set environment variables
`EXPOSE` - Telling docker that the application is running at specific port.
`USER` - Specify which user should run the application
`CMD` - Specify command that should be executed when running the application
`ENTRYPOINT` - Entry point of the application.

Our Dockerfile looks like

```Dockerfile
FROM node:latest
```

For example, if you want to use the latest version, you can use `node:latest`. But you should be careful as the version gets updated, you might face unexpected behavior.
It is recommended to use a specific version.

For this application we will use 14.17.6-buster. When you look at the tag from docker hub, you can see that there are many different versions for different os. But the compressed images sometimes are huge. If you want to use smaller ones, you can use `alpine` which is 10 times smaller than buster.

```Dockerfile
FROM node:14.17.6-alpine3.13
```

After we write this line and save, you can try running the application using docker.

```sh
docker build -t [tag name] [where to find Dockerfile].
```

Example

```sh
docker build -t react-app .
```

```
[+] Building 7.9s (6/6) FINISHED
 => [internal] load build definition from Dockerfile                                                                                                               0.0s
 => => transferring dockerfile: 65B                                                                                                                                0.0s
 => [internal] load .dockerignore                                                                                                                                  0.0s
 => => transferring context: 2B                                                                                                                                    0.0s
 => [internal] load metadata for docker.io/library/node:14.17.6-alpine3.13                                                                                         1.1s
 => [auth] library/node:pull token for registry-1.docker.io                                                                                                        0.0s
 => [1/1] FROM docker.io/library/node:14.17.6-alpine3.13@sha256:bd7f3879132b126e5f6770e7e50e223c2e74c1f223d27bfd06dd71a17ebb8fc3                                   6.7s
 => => resolve docker.io/library/node:14.17.6-alpine3.13@sha256:bd7f3879132b126e5f6770e7e50e223c2e74c1f223d27bfd06dd71a17ebb8fc3                                   0.0s
 => => sha256:f05f6c17701e756b57120fd037f0d51f2dc1db53d30c5e1041131acc57865ebd 6.53kB / 6.53kB                                                                     0.0s
 => => sha256:6767681722af471faabb3711beb798a7cf5654ca7590f8877e68c52dcc448cb1 36.40MB / 36.40MB                                                                   4.6s
 => => sha256:e5e37393f1338ca21367550f0917e83e2c5801f572d2e314b9551970b9c1d069 2.36MB / 2.36MB                                                                     0.4s
 => => sha256:7a72b80664d6851d92738dd15a82d1106c1301b8d1bf3976db2e6074aa0e1c67 283B / 283B                                                                         0.2s
 => => sha256:bd7f3879132b126e5f6770e7e50e223c2e74c1f223d27bfd06dd71a17ebb8fc3 1.43kB / 1.43kB                                                                     0.0s
 => => sha256:fd25bbf86ec9d4800b77d5a625a8d952e7fd928f71bedf10b9db001ac5857b2c 1.16kB / 1.16kB                                                                     0.0s
 => => extracting sha256:6767681722af471faabb3711beb798a7cf5654ca7590f8877e68c52dcc448cb1                                                                          1.5s
 => => extracting sha256:e5e37393f1338ca21367550f0917e83e2c5801f572d2e314b9551970b9c1d069                                                                          0.1s
 => => extracting sha256:7a72b80664d6851d92738dd15a82d1106c1301b8d1bf3976db2e6074aa0e1c67                                                                          0.0s
 => exporting to image                                                                                                                                             0.0s
 => => exporting layers                                                                                                                                            0.0s
 => => writing image sha256:1e88f032d30efef87f88dfe8bac7fb8e6557480c3769291dd6e23a60d9edef58                                                                       0.0s
 => => naming to docker.io/library/react-app                                                                                                                       0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
```

and now you should be able to run the image.

```sh
docker run -it react-app
```

```
Welcome to Node.js v14.17.6.
Type ".help" for more information.
```

Then, node will be executed. But we do not want to run this as node but run this as bash.

```bash
docker run -it react-app bash
```

```
internal/modules/cjs/loader.js:892
  throw err;
  ^

Error: Cannot find module '/bash'
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:889:15)
    at Function.Module._load (internal/modules/cjs/loader.js:745:27)
    at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:76:12)
    at internal/main/run_main_module.js:17:47 {
  code: 'MODULE_NOT_FOUND',
  requireStack: []
}
```

But as you can see it complains because it does not have bash installed. Since alpine is the very minimal image that only has what is required to run node, it doesn't have `bash`. But `shell` is always installed.

```sh
docker run -it react-app sh
```

```
$ docker run -it react-app sh
/ #
/ # node --version
v14.17.6
```

And now we have the base image, the next thing we need to do is to copy the application files into the image.

You can use either add/copy. Using the command, we can copy files/directories into the image. But we cannot copy anything from outside of the image.

**WHY**: when you build using docker, `docker build [docker directory]`,

```Dockerfile
COPY [...files/directories to copy] [directoy to copy]
```

**Example**

```Dockerfile
COPY package.json README.md /app
```

We can also use wild card

```Dockerfile
COPY package*.json README.md /app
```

If you want to copy everything inside of the directory, we use "."

```Dockerfile
COPY . /app/
```

3. Setting the working directory
   It is going to set the working directory and the rest of the commands inside of the working directory.

```Dockerfile
FROM node:14.17-alpine
WORKDIR /app
COPY hello world.txt .
```

It takes an array of arguments, `COPY ["hello.txt", "."]`

**Copy entire directory**

```Dockerfile
COPY . .
ADD . .
```

Unlike copy, using `ADD`, you can use file from web or add compressed file.

```Dockerfile
ADD http://...something.zip .
```

```Dockerfile
ADD file.zip .
```

4. Docker Ignore file

Use `.dockerignore` and list files that you wish docker to ignore.

`.dockerignore`

```
node_modules
```

5. Running the command using `RUN`

Use `RUN` to run commands.

```Dockerfile
RUN npm install
```

This below line throws error because apt is not installed in our machine.

```Dockerfile
RUN apt install  python.
```

6. Setting the environment variables

Use `ENV` to set environment variables

```Dockerfile
ENV API_URL=http://something.com
```

```Dockerfile
ENV API_URL http://something.com
```

You can use any of the two.

7. Exposing the application port using `EXPOSE`

However using this EXPOSE is just letting the docker know that it will use the port 3000. It won't necessarily allow you to connect to the port 3000.

```Dockerfile
EXPOSE 3000
```

We need to map our device to set our port to listen to docker port 3000.

8. Managing user

By default, docker uses root user in the machine. But this can cause security holes in the system. To run the system securely, we create user and assign the least amount of previledges needed to run the program.

we will -G and -S from `adduser`. We use `-G` so that we can set primary group of the user and `-S` to create a system user. It is a system user because it is not an actual user, but a user to run the system.

```sh
addgroup [groupname]
adduser -S -G [groupname] [username]
```

example

```sh
addgroup app
adduser -S -G app app
```

It is common best practice. Whenever we create a new user, we create a primary group with the same name.

```sh
groups app
```

```
app
```

We can combine this command using the double &

```sh
addgroup app && adduser -S -G app app
```

We will run the above line in the dockerfile.

Inside of `Dockerfile`, add a line

```Dockerfile
RUN addgroup app && adduser -S -G app app
USER app
```
