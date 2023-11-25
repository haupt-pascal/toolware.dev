ARG NODE_IMAGE=node:18-alpine3.17
#ARG NODE_IMAGE=node:18.4.0-bullseye-slim

FROM $NODE_IMAGE as dependencies

RUN mkdir -p /usr/src/tlwr/nuxt
WORKDIR /usr/src/tlwr/nuxt
COPY . .

RUN npx browserslist@latest --update-db
RUN yarn install --frozen-lockfile
RUN yarn build --standalone

FROM ${NODE_IMAGE}

RUN apk update && \
    apk add --no-cache bind-tools curl

WORKDIR /usr/src/tlwr/nuxt

COPY --from=dependencies /usr/src/tlwr/nuxt/.output ./.output

ENV NUXT_HOST=0.0.0.0

EXPOSE 3000

ENTRYPOINT ["node", ".output/server/index.mjs"]