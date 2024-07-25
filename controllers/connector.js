function extend(path, targetId, page) {
  $.ajax({
    url: path,
    method: 'GET',
    success: function (html) {
      $('#' + targetId).html(html);
      $('#' + page).addClass('active-navbar');
    },
    error: function (error) {
      console.error('Error:', error);
    }
  });
  
  console.log("ashdashju")
}
