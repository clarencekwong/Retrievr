class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :breed, :missing, :image, :last_vet_visit, :missing_latitude, :missing_longitude, :found_latitude, :found_longitude, :finder_name, :finder_phone_number

  belongs_to :user
  belongs_to :vet, required: false
  has_many :posters
end
