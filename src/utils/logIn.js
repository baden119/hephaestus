 // Redirect to Spotify for user authentication.

export const logIn = () => {

    const CLIENT_ID = '33a2bac1ec3649429a5db59eac210602';
    const homeURL = 'http://localhost:3000/'
      
    const scopes = [
    'user-read-private',
    'playlist-modify-public',
    'playlist-modify-private',
    ];

    const authEndpoint = 'https://accounts.spotify.com/authorize';
      
    const loginUrl = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${homeURL}&scope=${scopes.join(
        '%20'
      )}&response_type=token&show_dialog=true`;

    console.log("Attempting Redirect");
    window.location.assign(loginUrl);
}

// OLD AND BUSTED
// export const logIn = () => {

//     const homeURL = 'http://localhost:3000/'
      
//     const scopes = [
//     'user-read-private',
//     'playlist-modify-public',
//     'playlist-modify-private',
//     ];

//     const CLIENT_ID = '33a2bac1ec3649429a5db59eac210602';
//     const authEndpoint = 'https://accounts.spotify.com/authorize';
      
//     const loginUrl = `${authEndpoint}?client_id=${CLIENT_ID}&redirect_uri=${homeURL}&scope=${scopes.join(
//         '%20'
//       )}&response_type=token&show_dialog=true`;

//     console.log("Attempting Redirect");
//     window.location.assign(loginUrl);
// }