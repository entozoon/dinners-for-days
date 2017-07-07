# [DinnersForDays.com](https://dinnersfordays.com)

Save info about your meals and rate them!

## Setup

	npm install
	set HTTPS=true
	npm start

(not just `npm start`, as we need https to use a camera)

## Deploying

	npm build
	npm run deploy

## Troubleshooting

	'gcloud' is not recognized as an internal or external command

Make sure [gcloud SDK](https://cloud.google.com/sdk/downloads#interactive) bin stuff is in system path variable, similar to:

	C:\Program Files\Google\Cloud SDK\google-cloud-sdk\bin

## Tech

- [React](https://facebook.github.io/react/) - Javascript framework
- [Create-react-app](https://github.com/facebookincubator/create-react-app) - Boilerplate to save bunch of time
- [Firebase](https://firebase.google.com/) - Database
- [Firebase UI](https://github.com/firebase/firebaseui-web)
- [Clarifai](https://developer.clarifai.com/) - Image recognition
- [node-sass-chokidar](https://github.com/michaelwayman/node-sass-chokidar) - SCSS -> CSS compilation
