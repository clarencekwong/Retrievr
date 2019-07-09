class PosterSerializer < ActiveModel::Serializer
  attributes :lat, :long, :pet_description, :poster_name, :poster_phone
  belongs_to :pet
end
