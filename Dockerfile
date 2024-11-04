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

# Second stage - Installing Dependencies
FROM base AS install
RUN mkdir -p /temp
COPY package.json bun.lockb /temp/
RUN  cd /temp && bun install

# Third stage - Build
FROM install AS prerelease
COPY --from=install /temp/node_modules node_modules
COPY . .
ENV NODE_ENV=production
RUN bun run build

# Fourth stage - Production
FROM base AS release
COPY --chown=bun:bun --from=install /temp/node_modules node_modules
COPY --chown=bun:bun --from=prerelease /usr/src/app/.output .
USER bun
ENV HOST 0.0.0.0
EXPOSE 3000
ENTRYPOINT [ "bun", "run", "server/index.mjs" ]
