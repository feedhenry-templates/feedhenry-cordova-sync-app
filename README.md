# Cordova Sync Template

***Note: This is not intended as a template in RHMAP 3.x or RHMAP 4.x***

A basic list application that uses the FeedHenry data synchronisation framework.

This can be used in conjunction with the [FeedHenry Sync Server](https://github.com/feedhenry/fh-sync-server). The [fh-sync-js](https://github.com/feedhenry/fh-sync-js) library is used to connect to FeedHenry Sync Server.

## Running the app

### Locally in browser

1. Have a sync server running on localhost port `8001`.
2. Install dependencies, run `npm install`. This will also run `browserify`.
3. Start the app, run `grunt serve`.

### On a device

1. Modify the `uri` value in `sync-config.json` to point to an accessible sync server.
2. Follow [Cordova documentation](https://cordova.apache.org/docs/en/latest/guide/cli/index.html#add-platforms) for building the app.

## Troubleshooting

### Synchronization doesn't work

1. Make sure your sync server is up and running. "OK" response should be received upon sending `GET` request to URI specified in `sync-config.json`.
2. Run `npm install` (just `grunt browserify` might be sufficient) and re-build the app (re-run `grunt serve` if working locally).
