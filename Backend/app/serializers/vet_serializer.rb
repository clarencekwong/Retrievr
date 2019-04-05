class VetSerializer < ActiveModel::Serializer
  attributes :id, :name, :phone_number, :location

  has_many :pets
end
