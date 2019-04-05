class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :breed, :missing, :image, :last_vet_visit, :missing_latitude, :missing_longitude, :found_latitude, :found_longitude

  belongs_to :user
  belongs_to :vet
end
