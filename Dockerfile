# First stage - Base
ARG NODE_IMAGE=oven/bun:1-alpine
FROM --platform=linux/amd64 $NODE_IMAGE AS base
WORKDIR /usr/src/app
RUN apk --no-cache add openssh g++ make python3 git

# Second stage - Installing Dependencies and Build
FROM base AS install
COPY package.json bun.lockb ./
RUN bun install
COPY . .
RUN bunx --bun run build

# Third stage - Production
FROM base AS release
COPY --from=install /usr/src/app/.output ./.output
USER bun
ENV HOST 0.0.0.0
ENV PORT 3000
EXPOSE 3000
ENTRYPOINT ["bun", "run", "./.output/server/index.mjs"]
