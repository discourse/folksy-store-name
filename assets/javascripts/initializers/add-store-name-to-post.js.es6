import { withPluginApi } from 'discourse/lib/plugin-api';

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
    withPluginApi('0.1', addStoreName);
  }
};
