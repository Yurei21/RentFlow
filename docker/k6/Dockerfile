FROM grafana/k6:latest

WORKDIR /scripts

COPY load.js /scripts/load.js

ENTRYPOINT [ "k6" ]
CMD ["run", "/scripts/load.js"]