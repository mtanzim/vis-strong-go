FROM node:22-slim AS build

WORKDIR /app

COPY ./client-v2/package.json package.json
COPY ./client-v2/package-lock.json package-lock.json
RUN npm ci
COPY client-v2 .

RUN npm run build

FROM golang:1.24

WORKDIR /go/src/app
COPY --from=build /app/dist public
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .
RUN rm -rf client-v2

EXPOSE 8080
RUN go build -o rest-server main.go
CMD ["./rest-server"]