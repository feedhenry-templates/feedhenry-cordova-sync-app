# Cordova Sync Template

***Note: This is not intended as a template in RHMAP 3.x or RHMAP 4.x***

A basic list application that uses the FeedHenry data synchronisation framework.

This can be used in conjunction with the [FeedHenry Sync Server](https://github.com/feedhenry/fh-sync-server).

## Running the app

### Locally in browser

1. Have a sync server running on localhost port `8001`.
2. Install dependencies, run `npm install`. This will also run `browserify`.
3. Start the app, run `grunt serve`.

### On a device

1. Modify the `hostname` value in `sync-config.json` to point to an accessible sync server.
2. Follow [Cordova documentation](https://cordova.apache.org/docs/en/2.7.0/guide/command-line/).
