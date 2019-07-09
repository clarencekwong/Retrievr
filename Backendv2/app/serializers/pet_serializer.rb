class PetSerializer < ActiveModel::Serializer
  attributes :id, :name, :breed, :instagram, :missing
  belongs_to :user
  has_many :posters
end
