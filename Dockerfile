# First stage - Base
FROM node:18-alpine AS base
WORKDIR /usr/src/app

RUN apk --no-cache add ca-certificates wget

    # เช็ค cpu เครื่อง
RUN if [[ $(uname -m) == "aarch64" ]] ; \
    then \
    # aarch64
    wget https://raw.githubusercontent.com/squishyu/alpine-pkg-glibc-aarch64-bin/master/glibc-2.26-r1.apk ; \
    apk add --no-cache --allow-untrusted --force-overwrite glibc-2.26-r1.apk ; \
    rm glibc-2.26-r1.apk ; \
    else \
    # x86_64
    wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.28-r0/glibc-2.28-r0.apk ; \
    wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub ; \
    apk add --no-cache --force-overwrite glibc-2.28-r0.apk ; \
    rm glibc-2.28-r0.apk ; \
    fi

RUN npm install -g bun

RUN bun --version

FROM base AS install
WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN ls -la
RUN bun run build

FROM base AS release
WORKDIR /usr/src/app
COPY --from=install /usr/src/app/.output ./.output

RUN addgroup -S bungroup && adduser -S bunuser -G bungroup
USER bunuser

ENV HOST 0.0.0.0
ENV PORT 3000
EXPOSE 3000
ENTRYPOINT ["bun", "run", "./.output/server/index.mjs"]
