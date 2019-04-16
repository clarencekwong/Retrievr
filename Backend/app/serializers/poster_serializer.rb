class PosterSerializer < ActiveModel::Serializer
  attributes :missing_lat, :missing_lon, :descriptors, :missing_time, :comments

  belongs_to :pet
end
