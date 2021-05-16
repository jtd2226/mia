# Other Stuff

- Add metadata for mia's artist profile on google
  - [Meta tag generator](https://metatags.io/)

# How to implement Spotify pre-save feature using GCP and Nextjs

## Authenication with spotify

- [docs](https://developer.spotify.com/documentation/general/guides/authorization-guide/)
- Have user authenticate using spotify auth (see docs above)

## Store user info using GCP

- Store user access token and e-mail in GCP
  - Use Firestore to ensure it is encrypted or bad things can happen (firestore encrypts data automatically)
- Steps
  - Make pre-save button on home page
  - make `api/spotify/store` route for storing data in firestore
    - [using nextjs api routes](https://nextjs.org/docs/api-routes/introduction)
    - [using firebase admin sdk](https://firebase.google.com/docs/admin/setup)
    - client will pass oauth token and e-mail in json body
    - server will store data in firestore using the firebase admin sdk
  - Make `/presave` route that will authenticate user on load and automatically store info needed for cloud task to save song to users spotify account
    - Clicking presave button will redirect here
    - User can also go to link directly

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
