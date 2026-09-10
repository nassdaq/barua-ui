#!/usr/bin/env bash
# Lays the music bed under a rendered ad: trimmed to the ad's length, a short
# fade in, a longer fade out, loudness-normalised for social feeds, video
# untouched. Usage: mix.sh <video.mp4> <track.mp3> <offset-seconds> <out.mp4>
set -eu
V=$1; A=$2; OFF=$3; OUT=$4
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
FADE_OUT=1.6
ST=$(python3 -c "print(max(0, $DUR - $FADE_OUT))")
ffmpeg -v error -y -i "$V" -ss "$OFF" -i "$A" \
  -filter_complex "[1:a]atrim=0:$DUR,asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.4,afade=t=out:st=$ST:d=$FADE_OUT,loudnorm=I=-16:TP=-1.5:LRA=9[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$OUT"
