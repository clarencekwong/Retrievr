class User < ApplicationRecord
    has_secure_password
    has_many :pets
    validates :email, 'valid_email_2/email': { message: "is not a valid email" }
end
