/**
 * We need a custom cloud handler for fh-sync-js to allow us to append the
 * Authorization header that Keycloak provides.
 */
module.exports = function(cloudUrl, options, $http, cb) {
  return function (params, success, failure) {
    var url = cloudUrl + params.dataset_id;
    var headers = (options.headers || {});
    $http.post(url, params.req, options)
      .then(function (res) {
        return cb(null, res, success.bind(null, res.data));
      }, function (err) {
        return cb(err, null, failure.bind(null, err.data));
      });
  }
}
