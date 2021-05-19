# How to set up GCP firestore in nextjs

- Go to [GCP cloud console](https://console.cloud.google.com)
- Click "Select a project"
- Create a new project
- Go to [Firebase console](https://console.firebase.google.com)
- Click create project
- set project name to project you just created in cloud console
- Go to Build > Firestore Database
- Click "Create Database" and start in production mode
- Click the settings Gear
- Go to Project Settings
- Click Service accounts
- In the Firebase Admin SDK tab, make sure nodejs is checked, and Click "Generate new private key"
- Download the key to your project
  - NOTE: Make sure you add the file to your .gitignore so it is not pushed to git and available to the public
- In your .env.local file add the following environment variable:
  - > GOOGLE_APPLICATION_CREDENTIALS=<Path_to_your_service_account_key>.json
