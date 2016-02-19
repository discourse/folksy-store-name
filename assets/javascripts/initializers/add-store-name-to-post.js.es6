import { withPluginApi } from 'discourse/lib/plugin-api';
import PosterNameComponent from 'discourse/components/poster-name';

function oldPluginCode() {
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
}

function addStoreName(api) {
  api.addPosterIcon(cfs => {
    if (cfs) {
      const shopName = cfs.shop_name;
      const shopUrl = cfs.shop_url;

      if (!Ember.isEmpty(shopName) && !Ember.isEmpty(shopUrl)) {
        return {
          icon: 'shopping-cart',
          url: shopUrl,
          text: shopName,
          className: 'user-store'
        };
      }
    }
  });
}

export default {
  name: 'add-store-name-to-post',
  initialize() {
    withPluginApi('0.1', addStoreName, { noApi: oldPluginCode });
  }
};
