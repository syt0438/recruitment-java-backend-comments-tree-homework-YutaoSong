#!/bin/sh

TZ=Asia/Shanghai
ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

java -Xms$minx -Xmx$max -jar /opt/apps/work.jar --server.port=$port > /opt/apps/work.log
