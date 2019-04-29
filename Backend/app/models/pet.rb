class Pet < ApplicationRecord
  belongs_to :user
  belongs_to :vet, required: false
  has_many :posters
  has_one_attached :photo
end
