FROM ubuntu:latest AS build

RUN apt-get update
RUN apt-get install openjdk-21-jdk -y
RUN apt-get install maven -y

WORKDIR /app
COPY Backend/ /app/

RUN mvn clean install

FROM openjdk:21-jdk-slim

EXPOSE 8080

WORKDIR /app
COPY --from=build /app/target/murall-0.0.1-SNAPSHOT.jar /app/appmurall.jar
ENTRYPOINT ["java", "-jar","appmurall.jar"]