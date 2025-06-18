FROM node:20-alpine

WORKDIR /app

COPY package*.json .

ARG VITE_BACKEND_URL
ARG VITE_IMAGES_CDN_URL
RUN echo "VITE_BACKEND_URL=https://audit-backend-537386600621.us-west1.run.app" > .env
RUN echo "VITE_IMAGES_CDN_URL=https://images.careerseason.com" >> .env


RUN npm ci

COPY . .

RUN npm run build

RUN npm i -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-p", "3000"]