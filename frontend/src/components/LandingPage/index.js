import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchRandomSongs } from "../../store/songs";
import SignupFormModal from "../SignupFormModal";
import SongCard from "../Songs/SongCard";
import SongsIndex from "../Songs/SongsIndex";
import './LandingPage.css'

const LandingPage = () => {
    const dispatch = useDispatch()
    const songs = useSelector((state) => {
        return state.songs;
    })

    useEffect(() => {
        dispatch(fetchRandomSongs());
    }, [dispatch])

    return (
        <>
            <div className='landing-page'>
                <div className='top-box'>
                    <img src="https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_b-447230ef.jpg"></img>
                    <div className="box-text">
                        <h1>Welcome to Pirate Radio</h1>
                        <h3>The greatest music from across the 7 seas</h3>
                        <h3>Check out our entire catalog: </h3>
                        <Link to='/songs'>
                            <button className="song-button">Check it Out</button>
                        </Link>

                    </div>
                </div>
                <h2 id='treasure-trove'>Search the treasure trove of good music:</h2>
                {/* <SongsIndex /> */}
                <div className="song-grid">
                {songs &&
                    Object.values(songs).map(song => {
                        return <SongCard song = {song} />
                    })
                }
                </div>
                <div className='bottom-box'>
                    <img src="https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists-8081257b.jpg"></img>
                    <div className='box-text'>
                        <h1>Like what you hear?</h1>
                        <h3>Join our crew:</h3>
                        <SignupFormModal text="Set Sail" styling="set-sail"/>
                    </div>
                </div>
                <div className='promo-box'>
                    <h1>Like this page?</h1>
                    <h3>Check out more the most notorious pirate of all,</h3>
                    <h3 id='name'>Noah Kerner</h3>
                    <div className="button-box">
                        <a href='https://www.linkedin.com/in/noah-kerner-694797235/0'>
                            <i id='linkedin' class="fa-brands fa-linkedin fa-4x"></i>
                        </a>
                        <a href='https://github.com/B1G-M0N3Y'>
                            <i id='github' class="fa-brands fa-square-github fa-4x"></i>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LandingPage
