FROM golang:1.18-alpine3.17 AS build

ENV CGO_ENABLED=1

WORKDIR /app

RUN apk add -U sqlite sqlite-libs gcc musl-dev

COPY . .

RUN go mod vendor && go build -ldflags='-s -w -extldflags "-static"' ./main.go

FROM alpine:3.17

COPY --from=build /app/main /usr/local/bin/simple

ENTRYPOINT [ "/usr/local/bin/simple" ]