## To run in `development` mode

```
$ docker build -f Dockerfile-dev ./ -t docker-demo-dev
$ docker run --rm -it -p 0.0.0.0:4200:4200 docker-demo-dev
```
