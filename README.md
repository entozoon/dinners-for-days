# [DinnersForDays.com](https://dinnersfordays.com)

Save info about your meals and rate them!

## Development

	npm install
	set HTTPS=true
	npm start
	npm run https


### Desktop Testing (webcam)

  https://yourauthenticatedsubdomain.localhost:3001/

Change 'yourauthenticatedsubdomain' to that which is granted access by firebase.

### Mobile Testing

  https://yourlocalIP:3001/

You will need to be granted access by firebase to use this during development.

Note: It is technically accessible at http://localhost but it needs both https in order to use the camera, and a specific subdomain, as I can't leave the database open to access by localhost for obvious security reasons.

## Deploying

	npm run build
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
- [node-sass](https://github.com/sass/node-sass) - SCSS -> CSS compilation
