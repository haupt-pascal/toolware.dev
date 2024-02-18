ARG NODE_IMAGE=node:18-alpine3.17
#ARG NODE_IMAGE=node:18.4.0-bullseye-slim

FROM $NODE_IMAGE as dependencies

#RUN apk update && apk add --no-cache bind-tools curl
#RUN apk add g++ make py3-pip

RUN apk update
RUN apk add --no-cache bash
RUN apk add --no-cache bind-tools
RUN apk add --no-cache curl

RUN mkdir -p /usr/src/tlwr/nuxt
WORKDIR /usr/src/tlwr/nuxt
COPY . .


#RUN npx update-browserslist-db@latest
#RUN yarn install --frozen-lockfile
RUN yarn install
RUN yarn upgrade -R caniuse-lite
RUN yarn build --standalone


FROM ${NODE_IMAGE}

WORKDIR /usr/src/tlwr/nuxt

COPY --from=dependencies /usr/src/tlwr/nuxt/.output ./.output
#COPY ./CHANGELOG.md ./CHANGELOG.md

ENV NUXT_HOST=0.0.0.0

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]