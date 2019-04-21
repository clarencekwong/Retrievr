export default class PetAdapter {
  static PET_URL = "http://retrievr-api.herokuapp.com/api/v1/pets"
  static USER_URL = "http://retrievr-api.herokuapp.com/api/v1/users"
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
// IF I RUN INTO THE "CAN'T STRINGIFY CYCLIC DATA" ERROR...
/*
isCyclic = obj => {
  var seenObjects = [];

  function detect (obj) {
    if (obj && typeof obj === 'object') {
      if (seenObjects.indexOf(obj) !== -1) {
        return true;
      }
      seenObjects.push(obj);
      for (var key in obj) {
        if (obj.hasOwnProperty(key) && detect(obj[key])) {
          console.log(obj, 'cycle at ' + key);
          return true;
        }
      }
    }
    return false;
  }

  return detect(obj);
}
*/
