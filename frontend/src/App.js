import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useParams } from "react-router-dom";
import { fetchSongs } from "./store/songs";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SongsIndex from "./components/Songs/SongsIndex";
import SongDetails from "./components/Songs/SongDetails";
import CreateSong from "./components/Songs/CreateSong";
import EditSong from "./components/Songs/EditSong";
import Player from "./components/AudioPlayer/AudioBar";
import LandingPage from "./components/LandingPage";

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
      <div className="bungus">
        <div className="bingus">
          {isLoaded && (
            <Switch>
              <Route path="/signup">
                <SignupFormPage />
              </Route>
              <Route path='/songs/new'>
                <CreateSong />
              </Route>
              <Route path='/songs/:id/edit'>
                <EditSong />
              </Route>
              <Route path='/songs/deleted'>
                <h2>Song deleted!</h2>
              </Route>
              <Route path='/songs/:id'>
                <SongDetails />
              </Route>
              <Route path='/songs'>
                <h2> Hear what’s trending for free in the SoundCloud community </h2>
                <SongsIndex />
              </Route>
                <Route path='/'>
                  <LandingPage />
                </Route>
            </Switch>
          )}
        </div>
      </div>
      <div>
        <Player />
      </div>
    </>
  );
}

export default App;
