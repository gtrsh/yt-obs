#!/usr/bin/env sh

rm -rf /var/www/yt-obs
mkdir -p /var/www/yt-obs
cp -R packages/yt-client/dist/* /var/www/yt-obs
chown -R caddy:caddy /var/www/yt-obs
