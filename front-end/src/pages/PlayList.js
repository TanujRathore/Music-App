import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import backgroundImage from '../images/bluebackground.png';
import LogoutNavbar from '../navibars/LogoutNavbar';
import StaffNavbar from '../navibars/StaffNavbar';
import backButtonIcon from '../images/back-button-icon.png';
import { IconContext } from 'react-icons';
import { FaHeart, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import '../components/customCss.css';

function PlayList() {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };

    const { playlistName, username } = useParams();
    const [songs, setSongs] = useState([]);
    const [error, setError] = useState(false);
    const localUserRole = localStorage.getItem('userRole');
    const [currentPage, setCurrentPage] = useState(1);
    const songsPerPage = 6;
    const totalPages = Math.ceil(songs.length / songsPerPage);
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
    const [residentDetail, setResidentDetail] = useState({});
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [favouriteListId, setFavouriteListId] = useState(null);
    const [favouriteSongs, setFavouriteSongs] = useState([]);
    const isLoved = song => favouriteSongs.some(favSong => favSong.id === song.id);



    useEffect(() => {
        const fetchResidentDetails = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/user/manage/');
                const userDetail = response.data.data.find(user => user.username === username);
                if (userDetail) {
                    setResidentDetail(userDetail);
                } else {
                    console.log("No user found with the given username");
                }
            } catch (error) {
                console.error('Error fetching resident details:', error);
            }
        };
        fetchResidentDetails();
    }, [username]);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/musiclist/`)
            .then(response => {
                const userPlaylists = response.data.data.filter(list => list.userBelongTo === username);
                const targetPlaylist = userPlaylists.find(list => list.musicListName === playlistName);
                if (targetPlaylist) {
                    setSongs(targetPlaylist.musicIn);
                } else {
                    setError(true);
                }
                const favouriteList = response.data.data.find(list => list.musicListName === "Favourite");
                if (favouriteList) {
                    setFavouriteSongs(favouriteList.musicIn);
                }
            })
            .catch(error => {
                console.error('Failed to fetch songs from the backend', error);
                setError(true);
            });
    }, [playlistName, username]);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/musiclist/')
            .then(response => {
                const favouriteList = response.data.data.find(list => list.musicListName === "Favourite");
                if (favouriteList) {
                    setFavouriteListId(favouriteList.musicListId);
                }
            })
            .catch(error => {
                console.error('Failed to fetch playlists', error);
            });
    }, []);

    const toggleLove = async (index) => {
        const song = songs[index];
        const action = song.loved ? "DELETE" : "POST";

        if (favouriteListId) {
            try {
                const response = await axios({
                    method: action,
                    url: 'http://127.0.0.1:8000/musiclist/',
                    data: {
                        MusicID: song.id,
                        MusicListID: favouriteListId
                    }
                });

                if (response.status === 201) {
                    const updatedSongs = [...songs];
                    updatedSongs[index].loved = !updatedSongs[index].loved;
                    setSongs(updatedSongs);
                } else {
                    console.error('Failed to toggle love status');
                }
            } catch (error) {
                console.error('There was an error sending the request', error);
                setErrorMessage("Loved song failed, please try again later.");
                setShowErrorModal(true);
            }
        } else {
            console.error('Favourite list ID not found');
        }
    };

    const deleteSong = async (index) => {
        const song = songs[index];

        try {
            const response = await axios({
                method: "DELETE",
                url: 'http://127.0.0.1:8000/musiclist/',
                data: {
                    MusicID: song.id,
                    MusicListID: playlistName.musicListId
                }
            });

            if (response.status === 201) {
                const updatedSongs = [...songs];
                updatedSongs.splice(index, 1);
                setSongs(updatedSongs);
            } else {
                console.error('Failed to delete the song');
            }
        } catch (error) {
            console.error('There was an error sending the request', error);
            setErrorMessage("Delete song failed, please try again later");
            setShowErrorModal(true);
        }
    };

    const buttonStyle = {
        padding: '10px 20px',
        margin: '0 10px',
        backgroundColor: '#2c82cd',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };
    const positioningStyle = {
        position: 'absolute',
        top: '7rem',
        right: '7vw',
        fontSize: '1.25rem',
    };
    localStorage.setItem('playlistName', playlistName);
    console.log(playlistName);

    return (
        <div style={backgroundStyle}>
            {localUserRole === "staff" ? <StaffNavbar /> : <LogoutNavbar />}
            <Modal show={showErrorModal} onHide={() => { setShowErrorModal(false); setErrorMessage(null); }}>
                <Modal.Header closeButton>
                    <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="error-modal-message">{errorMessage}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => { setShowErrorModal(false); setErrorMessage(null); }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', marginTop: '15px' }}>
                <span className="d-flex align-items-center" style={{ marginRight: '8px' }}>
                    {residentDetail && residentDetail.firstname ? `Hello ! ${residentDetail.firstname} ${residentDetail.lastname}` : 'Hello! '}
                </span>
                <span className="d-flex align-items-center" style={{ fontSize: '20px' }}>
                    ----Now playing: {playlistName.replace("_", " ")}
                </span>
            </div>
            {error && (
                <div className="d-flex justify-content-center align-items-center" style={{ color: 'red', marginBottom: '20px' }}>
                    <h4>Loading playlist unsuccessfully, please try again later.</h4>
                </div>
            )}
            <Link
                to={`/PublicMusicLibrary/${username}`}
                className="custom-button2"
                style={positioningStyle}>
                Add Music to the list
            </Link>

            <Link to={`/musiclisthome/${username}`} style={{ position: 'absolute', top: '80px', left: '20px', textDecoration: 'none' }}>
                <img src={backButtonIcon} alt="Back to Music List Home" style={{ width: '30px', height: '30px' }} />
            </Link>

            <div className="d-flex justify-content-center align-items-center flex-column">
                {currentSongs.map((song, idx) => {
                    const actualIndex = indexOfFirstSong + idx;
                    return (
                        <div key={actualIndex}
                            style={{
                                borderRadius: '10px',
                                backgroundColor: 'white',
                                padding: '20px',
                                width: '1200px',
                                margin: '10px 0',
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontSize: '20px', fontWeight: 'bold', marginRight: '50px' }}>{song.name}</span>
                                <span>{song.artist}</span>
                            </div>

                            <div>
                                <IconContext.Provider value={{ color: isLoved(song) ? 'red' : 'black' }}>
                                    <FaHeart onClick={() => toggleLove(actualIndex)} style={{ cursor: 'pointer' }} />
                                </IconContext.Provider>
                                <FaTrash onClick={() => deleteSong(actualIndex)} style={{ cursor: 'pointer', marginLeft: '15px' }} />
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="pagination-controls" style={{ position: 'absolute', bottom: '50px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    style={buttonStyle}>
                    Previous
                </button>
                <span style={{ margin: '0 10px' }}>{currentPage} of {totalPages}</span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    style={buttonStyle}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default PlayList;








