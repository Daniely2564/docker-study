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
