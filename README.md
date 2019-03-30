## To run in `development` mode

### Prebuild image
```
$ docker build -f Dockerfile-dev ./ -t docker-demo-dev
```
### Then run
```
$ docker run --rm -it --mount type=bind,source="${pwd}"/src,target=/app/src -p 0.0.0.0:4200:4200 docker-demo-dev
```
