FROM node:12

# Directory chosen here doesn't matter as much.
# Is a linux filesystem, you have access to /tmp /opt etc..
COPY . /opt/app

# Set the working directory for any subsequent, Add, copy, CMD, ENTRYPOINT, or
# RUN instructions that follow it in the docker file.
WORKDIR /opt/app

## This runs one time when the container builds to create the image.
RUN yarn

## This runs every time the container starts.
CMD yarn watch
