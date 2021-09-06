import express from 'express';
import fetch from 'node-fetch';
import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method
const { clientId, clientSecret, port } = require('./config.json');

const app = express();

app.get('/', async ({ query }, response) => {
	const { code } = query;

	if (code) {
		try {
			const oauthResult = await fetch('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://localhost:${port}`,
					scope: 'identify',
				}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});

			const oauthData = await oauthResult.json();
			console.log(oauthData);
			
			// https://discord.com/developers/docs/resources/user#get-current-user
			const userResult = await fetch('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			console.log(await userResult.json());
		} catch (error) {
			// NOTE: An unauthorized token will not throw an error;
			// it will return a 401 Unauthorized response in the try block above
			console.error(error);
		}
	}

	return response.sendFile('index.html', { root: '.' });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

// https://discord.com/api/oauth2/authorize?client_id=882790658413297745&redirect_uri=http%3A%2F%2Flocalhost%3A53134%2Fauth&response_type=code&scope=identify
// https://discord.com/api/oauth2/authorize?client_id=882790658413297745&redirect_uri=http%3A%2F%2Flocalhost%3A53134%2Fauth&response_type=token&scope=identify