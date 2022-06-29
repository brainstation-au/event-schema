#!/usr/bin/env bash

set -u

hash aws || ( echo "AWS cli missing" >&2; exit 1; )

die () { echo "$1" >&2; exit 1; }

CURR_DIR=$(dirname $0)

export StackName="blue-team-event-bus"
export BusName=$StackName

# Deploy stack.
echo "Starting deployment of the stack $StackName"
docker-compose -f $CURR_DIR/compose.yml build deploy
if ! docker-compose -f $CURR_DIR/compose.yml run --rm deploy; then
  die "Failed to deploy stack $StackName"
fi
