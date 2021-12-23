FROM node:14

WORKDIR /code
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 43500
ENV REACT_APP_BACK_HOST=planni.me
ENV REACT_APP_BACK_PORT=43000
ENV REACT_APP_PORT=43500
ENV PORT=43500

CMD [ "npm", "start" ]
