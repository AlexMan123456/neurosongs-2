#!/bin/bash

REPOSITORY_ROOT="$(git rev-parse --show-toplevel)"
CALL_DIRECTORY="$(pwd)"
LOCKFILE="$REPOSITORY_ROOT/package-lock"

cd "$CALL_DIRECTORY"
npx npm-check-updates -u

if [[ "$CALL_DIRECTORY" == "$REPOSITORY_ROOT" ]]; then
    cp "$LOCKFILE.json" "$LOCKFILE-backup.json"
    if ! npm install; then
        echo "npm install failed, restoring lockfile"
        mv "$LOCKFILE-backup.json" "$LOCKFILE.json"
    else
        rm -f "$LOCKFILE-backup.json"
    fi
fi
