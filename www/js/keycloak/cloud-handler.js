/**
 * We need a custom cloud handler for fh-sync-js to allow us to append the
 * Authorization header that Keycloak provides.
 */
module.exports = function(cloudUrl, options, $http) {
  return function (params, success, failure) {
    var url = cloudUrl + params.dataset_id;
    var headers = (options.headers || {});
    $http.post(url, params.req, options)
      .then(function (res) {
        success(res.data);
      }, function (err) {
        failure(err.data);
      });
  }
}
