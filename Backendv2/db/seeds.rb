# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


User.create(name: "Greg", email: "123@test.com", password: "123", phone: "1234567890", location: "New York")
Pet.create(name: 'Bob', breed: "Australian Shephard", instagram: "abc.com", birthdate: "01/05/2019", user_id: 1, missing: false)
Poster.create(lat: "50", long: "50", pet_id: "0aa3416a-59ab-4999-ab5b-992caf8937ab", pet_description: "Big doge", poster_name: "Pete", poster_phone: "2134567890")

p "data populated"