# First stage - Base
ARG NODE_IMAGE=oven/bun:1-alpine
FROM --platform=linux/amd64 $NODE_IMAGE AS base
WORKDIR /usr/src/app
RUN apk --no-cache add openssh g++ make python3 git

# Second stage - Installing Dependencies and Build
FROM base AS install
RUN mkdir -p /temp
COPY package.json bun.lockb /temp/
RUN  cd /temp && bun install && bun run postinstall && bun run build 
 
# Third stage - Production
FROM base AS release
COPY --chown=bun:bun --from=install /temp/node_modules node_modules
COPY --chown=bun:bun --from=install /temp/.output .
USER bun
ENV HOST 0.0.0.0
# EXPOSE 3000
ENTRYPOINT [ "bun", "run", "server/index.mjs" ]