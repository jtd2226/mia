# Installing project for the first time

- Install npm: https://www.npmjs.com/get-npm
- Install yarn: `npm i --global yarn`
- Install localtunnel: `yarn add global localtunnel`

# Running the application:

- yarn dev
- default port is https://localhost:5000

# Other Stuff

- Add metadata for mia's artist profile on google
  - [Meta tag generator](https://metatags.io/)

# How to implement Spotify pre-save feature using GCP and Nextjs

## Authenication with spotify

- [docs](https://developer.spotify.com/documentation/general/guides/authorization-guide/)
- Have user authenticate using spotify auth (see docs above)

## Store user info using GCP

- Store user refresh token and e-mail in firestore
  - firestore encrypts data automatically
- Steps
  - Make pre-save button on home page
  - make `api/spotify/store` route for storing data in firestore
    - [using nextjs api routes](https://nextjs.org/docs/api-routes/introduction)
    - [using firebase admin sdk](https://firebase.google.com/docs/admin/setup)
    - client will pass oauth token and e-mail in json body
    - server will store data in firestore using the firebase admin sdk
  - Make `/presave` route that will authenticate user when the page loads and automatically store info needed for cloud task to save song to users spotify account
    - Clicking presave button will redirect here
    - User can also go to link directly
    - When pre-save date has passed, replace presave link with link to new song

## Save song using Cloud Tasks

- Make GCP scheduled job for saving the song to the users playlist

  - [docs](https://cloud.google.com/tasks/docs/dual-overview)

- Trigger job to run on release date (June 4th)

  - [Spotify api reference](https://developer.spotify.com/documentation/web-api/reference/)
  - Job will like the song on the user's spotify account by default
  - Save to playlist if user selected a playlist

- Extras
  - see if you can have it authenticate by switching to the app on mobile
  - build ui for user to select a playlist for the song to save to
  - allow user to create playlist in the app or allow it to save to a default playlist
  - build admin page for mia to send out e-mails using the stored e-mails as a mailing list
  - allow mia to schedule new releases in admin page
  - have music page get data from spotify and build custom ui instead of using iframes

NEW SONG UPC
196164375471

Example query
curl -X "GET" "https://api.spotify.com/v1/search?q=upc:196164375471&type=track%2Calbum" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQCdqJ3FBy4GcNT_DS9DMygYbEU-kwwsFN8BW3vYLA9_CmGwMhHKTz_ngO5flp1tZMQUV5mPpZAEs8CoLVbii59heDvnHOCFGDYCH29oSDverGDv7Yv9X1rrARRfM-NR5-HdLpVtl-lDvXe3IbMiOprNPKu-ZRtwiGGcW9li_zxupOFwM2k"

TEST SONG UPC
195939895060

curl -X "GET" "https://api.spotify.com/v1/search?q=upc:195939895060&type=track%2Calbum" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer BQCdqJ3FBy4GcNT_DS9DMygYbEU-kwwsFN8BW3vYLA9_CmGwMhHKTz_ngO5flp1tZMQUV5mPpZAEs8CoLVbii59heDvnHOCFGDYCH29oSDverGDv7Yv9X1rrARRfM-NR5-HdLpVtl-lDvXe3IbMiOprNPKu-ZRtwiGGcW9li_zxupOFwM2k"
