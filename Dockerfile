FROM node
EXPOSE 8000
COPY index.js worker.js package.json yarn.lock /app/
COPY public/ /app/public/
WORKDIR /app
RUN yarn install
CMD node index.js
