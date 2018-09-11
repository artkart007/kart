#!/usr/bin/env bash
root_path=`pwd`
echo "root path ---- >>>>" $root_path

kart_service_path="$root_path/kart-service"

#build UI
kart_ui_path="$root_path/kart-ui"
cd $kart_ui_path && yarn && yarn build && cp -r build/* "$kart_service_path/src/main/resources/static"

#build WAR
cd $kart_service_path && ./mvnw clean package