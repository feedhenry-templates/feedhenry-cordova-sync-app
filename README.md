# Cordova Keycloak Demo

***Note: This is not intended as a template in RHMAP 3.x or RHMAP 4.x***

A sync application that's protected by Keycloak service.

This can be used in conjunction with the [FeedHenry Sync Server](https://github.com/feedhenry/fh-sync-server).

## Running the app

### Setting up Keycloak
Follow the instructions at the sync server repository https://github.com/feedhenry/fh-sync-server.

### Locally in browser

1. Have a sync server running on localhost port `8001`.
2. Install dependencies, run `npm install`. This will also run `browserify`.
3. Start the app, run `grunt serve`.

### On a device

1. Modify the `hostname` value in `sync-config.json` to point to an accessible sync server.
2. Follow [Cordova documentation](https://cordova.apache.org/docs/en/2.7.0/guide/command-line/).

### Log in to the app
A user will exist with the credentials `awriter`, `123`. Once logged in sync
actions will be able to be performed and the users profile will be able to be
used.
