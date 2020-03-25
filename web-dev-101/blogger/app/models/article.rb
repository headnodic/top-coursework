class Article < ApplicationRecord
  has_many :comments, dependent: :destroy
  has_many :taggings, dependent: :destroy
  has_many :tags, through: :taggings, dependent: :destroy
  has_attached_file :image
  validates_attachment_content_type :image, :content_type => ["image/jpeg", "image/jpg", "image/png"]

  def tag_list
    self.tags.collect do |tag|
      tag.name
    end.join(", ")
  end

  def tag_list=(tags_string)
    tag_names = tags_string.split(",").collect{|s| s.strip.downcase}.uniq
    new_or_found_tags = tag_names.collect{|n| Tag.find_or_create_by(name: n)}
    self.tags = new_or_found_tags
  end
end
