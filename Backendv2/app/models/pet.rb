class Pet < ApplicationRecord
    has_many_attached :images
    belongs_to :user
    has_many :posters
end
