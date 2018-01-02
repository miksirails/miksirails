#!/usr/bin/env bash

function log {
  printf "[$(date +%Y-%m-%d:%H:%M:%S)]: $*\n"
}

cd "${BASH_SOURCE%/*}/.." || exit

echo `pwd`

unamestr=`uname`
if [[ "$unamestr" == "Linux" ]]; then
  CMD="bin/upstatic-linux-x86_64"
elif [[ "$unamestr" == 'Darwin' ]]; then
  CMD="bin/upstatic"
fi

if [ -z "$AWS_ACCESS_KEY_ID" ]; then
  log "Need to set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY"
  exit 1
fi

if [ -z "$AWS_SECRET_ACCESS_KEY" ]; then
  log "Need to set AWS_SECRET_ACCESS_KEY and AWS_SECRET_ACCESS_KEY"
  exit 1
fi


log "Setting up deployment configuration"

tee -a "$HOME/.upstatic" <<EOF >/dev/null

[accounts.miksirails]
AccessKey = "${AWS_ACCESS_KEY_ID}"
SecretKey = "${AWS_SECRET_ACCESS_KEY}"

EOF

if [ $? -eq 0 ]; then
    log "Created Upstatic config file"
else
    log "Config file creation failed"
    exit $?
fi


log "Starting deploy"

./$CMD deploy

if [ $? -eq 0 ]; then
    log "The deploy seems to have succeeded"
else
    log "The deploy seems to have FAILED"
    exit $?
fi
