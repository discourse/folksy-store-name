# name: folksy-store-name
# about: Show a link to a store in posts on the folksy forum
# version: 0.1
# authors: Robin Ward, Arpit Jalan

register_asset('stylesheets/folksy-store-name.css')

module ::AddSellers
  def self.add_seller!
    seller_group = Group.find_by_name("sellers")
    unless seller_group.nil?
      user_custom_fields = UserCustomField.where(name: "shop_url")

      user_custom_fields.each do |user_custom_field|
        next if user_custom_field.value.blank?
        unless GroupUser.where(group_id: seller_group.id, user_id: user_custom_field.user.id).exists?
          seller_group.group_users.create!(user_id: user_custom_field.user.id)
        end
      end
    end
  end
end

after_initialize do
  module ::AddSellers
    class AddSellersJob < ::Jobs::Scheduled
      every 1.day

      def execute(args)
        AddSellers.add_seller!
      end
    end
  end
end
