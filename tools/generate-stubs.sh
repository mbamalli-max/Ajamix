#!/bin/bash
set -euo pipefail
mkdir -p app/audio
for id in n1-maths-01 n2-maths-01 p1-maths-01 p1-maths-17 cg-activity-01; do
  ffmpeg -y -f lavfi -i anullsrc=r=22050:cl=mono -t 180 -b:a 64k -ac 1 "app/audio/${id}.mp3"
done
echo "Generated $(ls app/audio/*.mp3 | wc -l) stub audio files"
