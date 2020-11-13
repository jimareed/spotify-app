import React from "react";
import "./App.css";

var crypto = require('crypto')

function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}
  
function sha256(buffer) {
    return crypto.createHash('sha256').update(buffer).digest();
}
  

const SpotifyLogin = () => {
  
  const makeid = (length) => {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  const initiateSpotifyLogin = () => {
    // Generate the code verifier and its base 64 encoded hash
    const codeVerifier = base64URLEncode(crypto.randomBytes(32));
    const codeChallenge = base64URLEncode(sha256(codeVerifier));
    const state = makeid(12);

    // Set the code verifier and state in local storage so we can check it later
    sessionStorage.setItem("spotify-code-verifier", codeVerifier);
    sessionStorage.setItem("spotify-state", state);

    // construct the authentication url
    const authURL = `https://accounts.spotify.com/authorize?response_type=code&client_id=${process.env.REACT_APP_SPOTIFY_CLIENT_ID}&redirect_uri=http://localhost:3000/auth&scope=user-follow-modify&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

    // open the spotify authentication page
    window.open(authURL);
  };

  return (
    <div className="App">
      <button onClick={initiateSpotifyLogin}>Log in to spotify</button>
    </div>
  );
};

export default SpotifyLogin;

  