FROM node:20.16.0 AS plugin
ENV NODE_ENV=production

WORKDIR /app
COPY ./packages/plugin/package.json /app/packages/plugin/
COPY ./pnpm-lock.yaml ./pnpm-workspace.yaml ./package.json /app/

RUN npm i -g pnpm && pnpm i

COPY ./packages/plugin /app/packages/plugin

RUN cd /app/packages/plugin && pnpm build


FROM node:20.16.0 AS build

ENV NODE_ENV=production

ENV HOST=0.0.0.0

WORKDIR /app

COPY ./packages/server/package.json /app/packages/server/
COPY ./pnpm-lock.yaml ./pnpm-workspace.yaml ./package.json /app/

RUN npm i -g pnpm && pnpm i

COPY ./packages/server /app/packages/server
COPY --from=plugin /app/packages/plugin/dist /app/packages/server/public/plugin

RUN cd /app/packages/server && pnpm build

VOLUME [ "/app/packages/server/db" ]

CMD sh -c "cd /app/packages/server/ && NUXT_APP_BASE_URL=${BASE_URL} node .output/server/index.mjs"
