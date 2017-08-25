# Cordova Keycloak Demo

***Note: This is not intended as a template in RHMAP 3.x or RHMAP 4.x***

A sync application that's protected by Keycloak service.

This can be used in conjunction with the [FeedHenry Sync Server](https://github.com/feedhenry/fh-sync-server).

## Running the app

### Setting up Keycloak
The app expects a Keycloak server to be accessible. When using the default
Keycloak configuration in `config/keycloak-config.json` the server should be
accessible on `localhost` port `8080`.

`docker run -e KEYCLOAK_USER=admin -e KEYCLOAK_PASSWORD=admin -p 8080:8080 jboss/keycloak`

Once the server is running a Realm and Users must be created. Go to the
Keycloak admin console `http://127.0.0.1:8080` and login.

Hover over the current Realm `Master` and click `Create Realm`. Select to
import from a file and use `keycloak/example-realm.json` in this repo.

While in the new `myShoppingList` Realm. Go to the `import` tab and select to
import from file, select `keycloak/example-users.json` in this repo.

Enable all import options, e.g. `Import groups` and select `Import`.

### Locally in browser

1. Have a sync server running on localhost port `8001`.
2. Install dependencies, run `npm install`. This will also run `browserify`.
3. Start the app, run `grunt serve`.

### On a device

1. Modify the `hostname` value in `sync-config.json` to point to an accessible sync server.
2. Follow [Cordova documentation](https://cordova.apache.org/docs/en/2.7.0/guide/command-line/).

### Log in to the app
Two users will be created `areader` and `awriter`. Both have the password `123`.
`areader` will not be able to perform any modifications to the dataset and will
be given alerts when trying to do so.
`awriter` has full access to the dataset.
