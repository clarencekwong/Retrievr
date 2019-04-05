export default class PetAdapter {
  static PET_URL = "http://10.9.108.209:3000/api/v1/pets"
  static USER_URL = "http://10.9.108.209:3000/api/v1/users"

  static getPets() {
    return fetch(`${this.PET_URL}`)
      .then(res => res.json())
  }

  static getMyPets(userId) {
    return fetch(`${this.USER_URL}/${userId}`)
      .then(res => res.json())
  }

  static getFoundPet(petId) {
    return fetch(`${this.PET_URL}/${petId}`)
      .then(res => res.json())
  }
}
