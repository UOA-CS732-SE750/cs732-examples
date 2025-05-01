# Dockerized Dad Jokes
Our CS732 Dad Jokes app, fully containerized and runnable in one easy command with Docker Compose.

Once you have cloned this repo and made sure Docker is installed and running on your machine, you should be able to run everything using:

```bash
docker compose up --build
```

And then quit the terminal to stop the application running.

Or, you can run as a daemon (background process) using the `-d` flag:

```bash
docker compose up --build -d
```

Then stop the app using:

```bash
docker compose down
```

While running, if you want to initialize the database with some jokes, you can run the backend's `init-db` script by opening a terminal into the backend's Docker container.

In Docker Desktop (GUI), you can click the running backend container's vertical ellipsis (⋮) near the "stop" button, and choose "Open in terminal".

Or, using commands, you can get the container id using:

```bash
docker ps
```

Then open a shell using

```bash
docker exec -it <container_id> /bin/bash
```

Then, once you're in, you can run the `init-db` script as usual from within the container's Bash shell:

```bash
npm run init-db
```

You can then exit the container's shell using the `exit` command.

If you want to open the database in MongoDB Compass, you will need to expose port 27017 to your host machine by uncommenting lines 22 & 23 in `docker-compose.yml`, then stop and start the composition. you can then access the database as if it were running directly on your machine, rather than inside a Docker container.