# VPWA IRC App

This app is bundled with Docker container. You need to have Docker installed to properly run this app.

## Install Docker Compose
[Installation guide](https://docs.docker.com/compose/install/)


## Create `.env` file for server
Create `./vpwa-server/.env` and copy [`./vpwa-server/.env.example`](./vpwa-server/.env.example) content

```bash
cp ./vpwa-server/.env.example ./vpwa-server/.env
```

## Run docker container
### Regular start
```bash
docker-compose up
```
### Detached start
```bash
docker-compose up -d
```

## Stop docker container
### Regular start
```bash
ctrl + c
```
### For detached start
```bash
docker-compose stop
```
