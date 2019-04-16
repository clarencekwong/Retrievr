class Pet < ApplicationRecord
  belongs_to :user
  belongs_to :vet, required: false
  has_many :posters
end
