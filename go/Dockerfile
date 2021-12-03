FROM golang:1.17.3-alpine
# update & install git
RUN apk update && apk add git

RUN mkdir /go/src/app

WORKDIR /go/src/app

ADD . /go/src/app
RUN go mod download

EXPOSE 8080

CMD ["go", "run", "server.go"]