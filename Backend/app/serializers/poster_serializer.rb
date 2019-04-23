class PosterSerializer < ActiveModel::Serializer
  attributes :id, :missing_lat, :missing_lon, :pet_description, :missing_time, :comments

  belongs_to :pet
end
