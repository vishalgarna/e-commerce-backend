
From node:20.11.0

WORKDIR /grocerryBackend

COPY . .

RUN npm install

EXPOSE 3000

CMD ["npm" , "start"]