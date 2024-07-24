FROM node:20-alpine

# WORKDIR /usr/src/app
WORKDIR /app

COPY . .

# RUN yarn install --quiet --no-optional --no-fund --loglevel=error
RUN yarn install 

RUN yarn run build

EXPOSE 10000

CMD ["yarn", "run", "start:prod"]

