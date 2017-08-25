/**
 * We need a custom cloud handler for fh-sync-js to allow us to append the
 * Authorization header that Keycloak provides.
 */

/**
 * A header to be appended to a sync request.
 * @typedef {Object} RequestHeader
 * @property {string} name Name of the header, e.g. Content-Type
 * @property {string} value Value of the header, e.g. application/json
 */

 /**
  * Construct a cloud handler for fh-sync-js. This allows for custom headers to
  * be appended, response codes to be handled differently etc.
  *
  * @param {string} cloudUrl Sync server URL
  * @param {Object} options
  * @param {string} options.cloudPath Path to append to cloudUrl. e.g. /sync
  * @param {RequestHeader[]} options.headers Headers to append to each request
  */
 function buildSyncCloudHandler(cloudUrl, options) {
   return function(params, success, failure) {
     console.log('Custom handler invoked');
      var url = cloudUrl + (options.cloudPath || '') + params.dataset_id;
      var payload = JSON.stringify(params.req);

      // Create a HTTP request object.
      var xhr = new XMLHttpRequest();
      // Sync only accepts POST requests.
      xhr.open("POST", url, true);
      // Sync expects a JSON request.
      xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
      options.headers.forEach(function(header, index, headers) {
        xhr.setRequestHeader(header.name, header.value);
      });
      xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          // Not Modified or any 2xx response is fine. If not, fail.
          if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
            var responseJson;
            try {
              if (xhr.responseText) {
                responseJson = JSON.parse(xhr.responseText);
              }
            } catch (e) {
              return failure(e);
            }
            success(responseJson);
          } else {
            failure(xhr.responseText);
          }
        }
      };
      xhr.send(payload);
   }
 }

 module.exports = {
  buildSyncCloudHandler: buildSyncCloudHandler
 };
