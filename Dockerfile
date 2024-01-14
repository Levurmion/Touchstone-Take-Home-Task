# next build
FROM node:18-alpine3.18 as nextbuild

WORKDIR /app/

COPY package*.json .
RUN npm install

COPY . .

RUN npm run build

# production only requiring the .next directory
FROM node:18-alpine3.18 as nextprod

WORKDIR /app/

COPY --from=nextbuild /app/package*.json /app
RUN npm install --omit=dev

COPY --from=nextbuild /app/.next /app/.next

EXPOSE 3000

CMD ["npm", "run", "start"]