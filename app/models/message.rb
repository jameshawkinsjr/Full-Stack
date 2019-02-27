# == Schema Information
#
# Table name: messages
#
#  id          :bigint(8)        not null, primary key
#  body        :text             not null
#  chatroom_id :integer          not null
#  author_id   :integer          not null
#  parent_id   :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Message < ApplicationRecord
end
