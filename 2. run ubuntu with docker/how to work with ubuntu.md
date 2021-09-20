# How to work with Ubuntu

1. How to get image from docker hub.

There are two ways to get image from docker hub.

```sh
docker pull ubuntu
```

alternatively, you can

```sh
docker run ubuntu
```

```
Unable to find image 'ubuntu:latest' locally
latest: Pulling from library/ubuntu
35807b77a593: Pull complete
Digest: sha256:9d6a8699fb5c9c39cf08a0871bd6219f0400981c570894cd8cbea30d3424a31f
Status: Downloaded newer image for ubuntu:latest
```

if you do not have ubuntu in your local docker images, docker can smartly download it for you.

2. Check if docker is running.

Use docker ps(process state) to see if it is running.

```sh
docker ps
```

```
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```

As you can see docker doesn't have anything. but if you use `-a` to see all, you can see it but not running currently.

```sh
docker ps
```

```
CONTAINER ID   IMAGE          COMMAND                  CREATED              STATUS                          PORTS     NAMES
042d07f628bf   ubuntu         "bash"                   About a minute ago   Exited (0) About a minute ago             focused_pike
```

3. Interfacting with docker.

Use `-it` to interact with the container

```sh
docker run -it ubuntu
```

```
root@185d2b20352c:/#
```

4. Loggin into the user as a user.

```sh
docker ps
```

```
CONTAINER ID   IMAGE     COMMAND   CREATED          STATUS         PORTS     NAMES
185d2b20352c   ubuntu    "bash"    50 minutes ago   Up 2 seconds             heuristic_galileo
```

Now execute it as a user.

```sh
docker exec -it -u john 185d2b20352c bash
```

It is saying that I want to execute this container using bash session as John.
