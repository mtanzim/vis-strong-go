FROM node:15 as build

WORKDIR /app

COPY ./client/package.json package.json
RUN npm install
COPY client .

RUN npm run build

FROM golang:latest

WORKDIR /go/src/app
COPY --from=build /app/build public
# COPY public public
COPY go.mod .
COPY go.sum .
RUN go mod download
COPY . .


EXPOSE 8080
RUN go build -o rest-server main.go
CMD ["./rest-server"]