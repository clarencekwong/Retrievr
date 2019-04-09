export default class PetAdapter {
  static PET_URL = "http://10.9.108.116:3000/api/v1/pets"
  static USER_URL = "http://10.9.108.116:3000/api/v1/users"
//****** When changing the url to whatever my wifi port is... DO NOT FORGET THE HTTP://
  static getPets() {
    return fetch(`${this.PET_URL}`)
      .then(res => res.json())
  }

  static getUsers() {
    return fetch(`${this.USER_URL}`)
      .then(res => res.json())
  }

  static postToUsers(data) {
    return fetch(`${this.USER_URL}`, {
      method: "POST",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
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
