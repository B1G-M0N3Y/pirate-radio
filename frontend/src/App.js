import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import { fetchSongs } from "./store/songs";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongsIndex from "./components/Songs/SongsIndex";
import SongDetails from "./components/Songs/SongDetails";
import CreateSong from "./components/Songs/CreateSong";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchSongs())
  }, [dispatch])
  const { id } = useParams();

  const songs = useSelector(state => {
    return state.songs
  })

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path='/songs/new'>
            <CreateSong />
          </Route>
          <Route path='/songs/:id'>
            <SongDetails />
          </Route>
          <Route path='/songs'>
            <h2> Hear what’s trending for free in the SoundCloud community </h2>
            <SongsIndex />
          </Route>
        </Switch>
      )}
      <div>
      </div>
    </>
  );
}

export default App;
