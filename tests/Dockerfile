FROM cypress/included:13.15.1 

WORKDIR /e2e

COPY package*.json ./
RUN npm install

COPY . .

