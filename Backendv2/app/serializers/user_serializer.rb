class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password, :phone, :location
  has_many :pets
end
