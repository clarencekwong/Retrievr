class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :email, :password, :phone

  has_many :pets
end
