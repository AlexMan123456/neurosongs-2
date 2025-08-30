#!/bin/bash

REPOSITORY_ROOT="$(git rev-parse --show-toplevel)"
CALL_DIRECTORY="$(pwd)"
LOCKFILE="$REPOSITORY_ROOT/package-lock.json"

cd "$CALL_DIRECTORY"
npx npm-check-updates -u

if [[ "$CALL_DIRECTORY" == "$REPOSITORY_ROOT" ]]; then
    cp "$LOCKFILE" "$LOCKFILE.backup.json"
    if ! npm install; then
        echo "npm install failed, restoring lockfile"
        mv "$LOCKFILE.backup.json" "$LOCKFILE"
    else
        rm -f "$LOCKFILE.backup.json"
    fi
fi
