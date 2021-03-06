FROM johnpapa/angular-cli

WORKDIR /app

COPY . /app

RUN cd /app && npm install && ng build --prod

EXPOSE 80

RUN chmod +x /app/start.sh

ENTRYPOINT ["/app/start.sh"]
