FROM node:lts-alpine

ARG ssh_priv_key

RUN apk add --no-cache openssh-client git wait4ports

COPY package.json /app/
WORKDIR /app

# Add the keys and set permissions
RUN mkdir -p /root/.ssh  && \
    chmod 0700 /root/.ssh && \
    echo "$ssh_priv_key" > /root/.ssh/id_rsa && \
    chmod 600 /root/.ssh/id_rsa && \
    ssh-keyscan github.com >> /root/.ssh/known_hosts

RUN npm install
RUN npm install --only=dev

COPY ../.. /app

# Remove SSH keys
RUN rm -rf /root/.ssh/

#Build bundle.js for frontend with webpack
RUN npm run build:front

EXPOSE 3002 3737

CMD [ "sh", "-c", "wait4ports tcp://postgres:5432 && npm run start"]
