# README

Retrievr is a React Native app with a Rails backend (hosted on Heroku). The app gives pet owners the ability to create virtual "Missing Pet Posters" that are hosted on an external web page and also gives all users the ability to scan an animal's tag (accompanying hardware with associated QR code) to notify a lost pet's owner that their pet has been found, where it was found, who found it and an immediate means of contacting the finder of the pet.

* Ruby (v.2.6.1)

* Rails (v.5.2.2)

* React Native

* Redux

* Expo


INSTALLATION INSTRUCTIONS:

After cloning down from github...

* Download expo on mobile device

* cd Frontend/

* npm install     

* npm start

* Scan QR code

HOME SCREEN:

* Add pets via settings page.

* If a user has multiple pets, they can swipe on the top half of the screen to cycle through their pets

* Double tap on the top half of the screen to show a given pet's associated QR code

* Mark a pet as missing by selecting the toggle (defaulted as "Safe and Sound")

  * Once marked missing, a form renders allowing the user to add information regarding their pet including where and when it went missing, as well as some descriptions to help other app users identify the lost animal.

  * This information will be made visible via an external web page http://retrievr-api.herokuapp.com/profile/:id

    * This webpage will be a virtual missing poster that is only visible when a given animal is missing.

    * This page will contain a button that will allow the finder of a lost pet to alert the owner that the animal was found, as well as a link to call the owner.

  * A list of missing pets is available at http://retrievr-api.herokuapp.com/missing-posters

    * This list will have virtual posters that contain information that could potentially help good samaritans find someone's lost pet.

  * When pets are marked as "Safe and Sound" (no-longer missing), these posters are deleted.

* Button on the home screen that redirects the user to the external missing pet posters page

* Another button on the home screen is an external link to chewy.com

QR SCANNER:

* If a user finds an animal that appears to be lost or that they recognize from the missing posters page, they can use the QR scanner to scan the animal's tag.

  * When this scan occurs, the geolocation of the user is noted and sent to the lost pet's owner.

  * Also, the user's name and phone number (from signup) are sent to the pet's owner so that the owner is able to retrieve their lost pet and make the finder aware of the fact that they're en route. When the scan occurs, the owner is notified and additional buttons become visible/ clickable that show the scan location and the finder's phone number.

* If someone without the app finds a lost pet with a Retrievr tag, they would be able to scan the tag with their normal camera on their phone and follow the link to a webpage that would alert the pet's owner that their animal was found and prompt the finder to call the owner.

SETTINGS SCREEN:

* Gives user the ability to log out

* User can add a pet

* User can associate a veterinarian to their pet and schedule an appointment with said veterinarian

LOG IN / SIGN UP:

* User can log in with correct credentials

* New users can create accounts by signing up   
