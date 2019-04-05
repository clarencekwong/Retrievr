# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

################ User seeds
User.create(name: "Eli Cleveland", email: "elicleveland12@gmail.com", password: "1234")
User.create(name: "Hermoine Grainger", email: "hgrainger@hogwarts.edu", password: "ron")
User.create(name: "Jasmine", email: "princessjasmine@hotmail.com", password: "aladin")
User.create(name: "Goofy", email: "g.oofy@MIT.edu", password: "pi")
User.create(name: "Sabrina", email: "sabrina@teenagewitch.net", password: "boo")
User.create(name: "Dorothy", email: "dorothy@kstate.edu", password: "nplh")

################ Vet seeds
Vet.create(name: "Mike Jones, DVM", phone_number: "315-336-0006", location: "6127 Happy Valley Rd, Verona, NY 13478")
Vet.create(name: "Mike Jones Jr., DVM", phone_number: "315-336-0006", location: "6127 Happy Valley Rd, Verona, NY 13478")
Vet.create(name: "Madison Jones, DVM", phone_number: "315-336-0006", location: "6127 Happy Valley Rd, Verona, NY 13478")
Vet.create(name: "Dr. Doolittle, DVM", phone_number: "555-555-0213", location: "4127 Speaking Animals Way, Chicago, IL 52352")

################ Pet seeds
Pet.create(name: "Jake", age: 10, breed: "Black Lab", image: "https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/1917678_1154186972914_4832899_n.jpg?_nc_cat=111&_nc_eui2=AeGL-qcY1Po6P0tWFZN2aFLOLTkHliZ9OoAKvJ0Hr7oOtg6SLYFQIdwWvn2ROLSXti4PJ1V_40dbdQBuj7yE0sHzlGl_dsOgb95Dp8oZdCtN4Q&_nc_ht=scontent-lga3-1.xx&oh=954cc3e19b9a0b03aff4fb6f463c4727&oe=5D08B4BC", user_id: 1, vet_id: 1, last_vet_visit: "01/05/2019")
Pet.create(name: "Crookshanks", age: 15, breed: "Creamsicle Cat", image: "http://images.adagio.com/images2/custom_blends/44579.jpg", user_id: 2, vet_id: 4, last_vet_visit: "01/05/2015")
Pet.create(name: "Rajah", age: 4, breed: "Tiger", image: "https://fanfest.com/wp-content/uploads/2017/11/Rajah.jpg", user_id: 3, vet_id: 3, last_vet_visit: "03/05/1999")
Pet.create(name: "Pluto", age: 7, breed: "Yellow Dog", image: "http://astrologynewsservice.com/wp-content/uploads/2014/08/1240-305x260.png", user_id: 4, vet_id: 1, last_vet_visit: "01/30/2019")
Pet.create(name: "Salem Saberhagen", age: 10, breed: "Black Cat", image: "https://pbs.twimg.com/profile_images/988746496584667136/nnsUpe6Y_400x400.jpg", user_id: 5, vet_id: 1, last_vet_visit: "01/20/1998")
Pet.create(name: "Toto", age: 11, breed: "Carin Terrier", image: "https://media.npr.org/assets/img/2014/08/25/toto-oz_wide-282fc7cd4c1da4baddbc5f3a69f84d42cad6f06c.jpg?s=1400", user_id: 6, vet_id: 3, last_vet_visit: "11/21/2015")
Pet.create(name: "Izzie", age: 6, breed: "Labradoodle", image: "https://www.cobberdogking.com/imagenes/about-labradoodle/labradoodle-types/photo-australian-labradoodle.jpg", user_id: 1, vet_id: 2, last_vet_visit: "03/15/2019")
