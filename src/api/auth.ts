// import { OAuth2Client } from 'google-auth-library';
// // https://www.npmjs.com/package/google-auth-library#oauth2
// // https://github.com/googleapis/google-cloud-node/tree/main/packages/google-cloud-compute


// export const oAuth2Client = new OAuth2Client(
//     process.env.CLIENT_ID,
//     process.env.CLIENT_SECRET,
//     process.env.REDIRECT_URI
// );

// async function main() {
//     const oAuth2Client = await getAuthenticatedClient();
//     // Make a simple request to the People API using our pre-authenticated client. The `request()` method
//     // takes an GaxiosOptions object.  Visit https://github.com/JustinBeckwith/gaxios.
//     const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
//     const res = await oAuth2Client.request({ url });
//     console.log(res.data);

//     // After acquiring an access_token, you may want to check on the audience, expiration,
//     // or original scopes requested.  You can do that with the `getTokenInfo` method.
//     const tokenInfo = await oAuth2Client.getTokenInfo(
//         oAuth2Client.credentials.access_token
//     );
//     console.log(tokenInfo);
// }


// function getConsentUrl() {
//     //
//     const authorizeUrl = oAuth2Client.generateAuthUrl({
//         access_type: 'online',
//         scope: 'https://www.googleapis.com/auth/compute',
//       });
// }