FROM node:20.16.0 AS build

ENV NODE_ENV=production

ENV HOST=0.0.0.0

WORKDIR /app

COPY ./packages/server/package.json /app/packages/server/
COPY ./pnpm-lock.yaml ./pnpm-workspace.yaml ./package.json /app/

RUN npm i -g pnpm && pnpm i

COPY ./packages/server /app/packages/server

RUN cd /app/packages/server && pnpm build

VOLUME [ "/app/packages/server/db" ]

CMD sh -c "NUXT_APP_BASE_URL=${public} node /app/packages/server/.output/server/index.mjs"
