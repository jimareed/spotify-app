import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SpotifyAuthRedirect(props) {
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    // helper function to parse query parameters
    const getParams = function (url) {
      var params = {};
      var parser = document.createElement("a");
      parser.href = url;
      var query = parser.search.substring(1);
      var vars = query.split("&");
      for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        params[pair[0]] = decodeURIComponent(pair[1]);
      }
      return params;
    };

    const params = getParams(window.location.href);
    const code = params.code;
    const state = params.state;

    // check state
    if (state !== sessionStorage.getItem("spotify-state")) {
      console.log("state not found in session storage");
      setError(true);
      return undefined;
    }
    const postBody = {
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      grant_type: "authorization_code",
      code: code,
      redirect_uri: "http://localhost:3000/auth",
      code_verifier: sessionStorage.getItem("spotify-code-verifier"),
    };

    console.log(postBody);
    // Create a POST request
    console.log("sending POST");

    axios
      .post("https://accounts.spotify.com/api/token", postBody, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;",
        },
      })
      .then((res) => {
        console.log(res);
        /**
         * At this point, you can send the token to your backend to extract
         * the user's details and store them in the database.
         */
        setRedirect(true);
      })
      .catch((err) => {
        // There was an error authenticating with the Spotify API
        console.log("ERROR");
        console.log(err);
        setError(true);
      });
  }, []);
  return (
    <div>
      {!redirect && !error && <h3>Authenticating...</h3>}
      {redirect && <div>Authentication successful!</div>}
      {error && <h3>There was an error authenticating with Spotify.</h3>}
    </div>
  );
}