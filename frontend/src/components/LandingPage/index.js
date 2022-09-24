import { Link } from "react-router-dom";
import SongsIndex from "../Songs/SongsIndex";
import './LandingPage.css'

const LandingPage = () => {
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
                <h2>Hear what's new from the soundcloud community</h2>
                <SongsIndex />
                <div className='bottom-box'>
                    <img src="https://a-v2.sndcdn.com/assets/images/sc_landing_header_web_featured_artists-8081257b.jpg"></img>
                    <div className='box-text'>
                        <h1>Like what you hear?</h1>
                        <h3>Join our crew:</h3>
                        <Link to='/signup'>
                            <button>
                                Set Sail
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='promo-box'>
                    <h1>Like this page?</h1>
                    <h3>Check out more the most notorious pirate of all,</h3>
                    <h3>Noah Kerner</h3>
                    <div className="button-box">
                        <i class="fa-brands fa-linkedin fa-4x"></i>
                        <i class="fa-brands fa-square-github fa-4x"></i>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LandingPage
