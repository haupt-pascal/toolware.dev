#ARG NODE_IMAGE=node:18-alpine3.17
ARG NODE_IMAGE=node:20.4.0
#ARG NODE_IMAGE=node:18.4.0-bullseye-slim

FROM $NODE_IMAGE as dependencies

# to resolve node gyp error on alpine when installing with the --production flag
#RUN apk add g++ make py3-pip
#RUN apk add curl
#RUN apk add

# Install dnsutils, whois, and curl
RUN apt-get update && apt-get install -y dnsutils whois curl

RUN mkdir -p /usr/src/tlwr/nuxt
WORKDIR /usr/src/tlwr/nuxt
COPY . .

RUN npx browserslist@latest --update-db
RUN yarn install --frozen-lockfile
RUN yarn build --standalone


FROM ${NODE_IMAGE}

WORKDIR /usr/src/tlwr/nuxt

COPY --from=dependencies /usr/src/tlwr/nuxt/.output ./.output
#COPY ./CHANGELOG.md ./CHANGELOG.md

ENV NUXT_HOST=0.0.0.0

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]