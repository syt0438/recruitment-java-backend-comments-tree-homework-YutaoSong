FROM openjdk:8
COPY ./work.jar /opt/apps/work.jar
COPY ./start.sh /opt/apps/start.sh
ENV minx 512m
ENV max 512m
ENV port 8080
EXPOSE 8080
RUN chmod u+x /opt/apps/start.sh
RUN ln -sf /dev/stdout /opt/apps/work.log
CMD ["/opt/apps/start.sh"]