var PosterNameComponent = require('discourse/components/poster-name').default;

PosterNameComponent.on('renderedName', function(buffer, post) {
  var customFields = post.get('user_custom_fields');
  if (customFields) {
    var shopName = customFields.shop_name,
        shopUrl = customFields.shop_url;

    if (!Em.isEmpty(shopName) && !Em.isEmpty(shopUrl)) {
      buffer.push("<span class='user-store'><i class='fa fa-shopping-cart'></i>");
      buffer.push("<a href='" + shopUrl + "'>" + shopName + "</a></span>");
    }
  }
});

