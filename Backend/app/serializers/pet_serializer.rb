class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :breed, :missing, :image, :last_vet_visit

  belongs_to :user
  belongs_to :vet
end
