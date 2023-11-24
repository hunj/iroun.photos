# Use node alpine as it's a small node image
FROM node:alpine as build

# fuck off
ENV NEXT_TELEMETRY_DISABLED 1

# Create the directory on the node image 
# where our Next.js app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Copy package.json
# to the /app working directory
COPY package.json /app
COPY yarn.lock /app

# Install dependencies in /app
RUN yarn install

# Copy the rest of our Next.js folder into /app
COPY . /app

# determine whether to run yarn build or yarn dev from argument - passed from docker-compose.yml
ARG BUILD_DEVELOPMENT=production
ENV NODE_ENV=$BUILD_DEVELOPMENT

# whether to yarn build or nah
RUN if [ "$NODE_ENV" = "production" ]; \
    then yarn build; \
    fi

# Ensure port 3000 is accessible to our system
EXPOSE 3000

# CMD gets overridden if docker-compose defines `command`
CMD ["yarn", "start"]
