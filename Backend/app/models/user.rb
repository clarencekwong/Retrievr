class User < ApplicationRecord
  has_many :pets
  has_many :posters 
end
