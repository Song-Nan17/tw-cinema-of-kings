function request(type, url, callback) {
  $.ajax({
      type,
      url,
      dataType: "jsonp",
      success: function (json) {
          callback(json)
      }
  });
}