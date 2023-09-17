import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import backgroundImage from '../images/bluebackground.png';
import LogoutNavbar from '../navibars/LogoutNavbar';
import StaffNavbar from '../navibars/StaffNavbar';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import '../components/customCss.css';

function PublicMusicLibrary() {
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };
    const [songs, setSongs] = useState([]);
    const [selectedSongs, setSelectedSongs] = useState([]);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const songsPerPage = 6;
    const totalPages = Math.ceil(songs.length / songsPerPage);
    const indexOfLastSong = currentPage * songsPerPage;
    const indexOfFirstSong = indexOfLastSong - songsPerPage;
    const currentSongs = songs.slice(indexOfFirstSong, indexOfLastSong);
    const navigate = useNavigate();
    const { username } = useParams();
    const localUserRole = localStorage.getItem('userRole');
    const [showErrorModal, setShowErrorModal] = useState(false);
    const playlistName = localStorage.getItem('playlistName');
    console.log(playlistName);


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
    ;
    
    useEffect(() => {
        axios.get(`/api/playlists`) //wrong API
            .then(response => {
                if (response.data) {
                    setSongs(response.data.songs);
                } else {
                    setError(true);
                }
            })
            .catch(error => {
                console.error('Failed to fetch songs from the backend', error);
                setError(true);
            });
            return () => {
                localStorage.removeItem('playlistName');
            };
    }, [playlistName, username]);

    const toggleSongSelection = (songId) => {
        if (selectedSongs.includes(songId)) {
            setSelectedSongs(prevSongs => prevSongs.filter(id => id !== songId));
        } else {
            setSelectedSongs(prevSongs => [...prevSongs, songId]);
        }
    };

    const addToPlaylist = async () => {
        try {
            const response = await axios.post('/api/addToPlaylist', { //wrong API
                playlistName,
                songIds: selectedSongs
            });

            if (response.data.success) {
                alert('Songs added to playlist successfully!');
                setSelectedSongs([]);
                navigate(`/playlists/${username}/${playlistName}`);
            } else {
                setErrorMessage('Failed to add songs to playlist.');
                setShowErrorModal(true);
            }
        } catch (error) {
            console.error('Failed to add songs to playlist:', error);
            setErrorMessage('There was an error adding songs to the playlist.');
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



    return (
        <div style={backgroundStyle}>
            {localUserRole === "staff" ? <StaffNavbar /> : <LogoutNavbar />}
              
            <div className="d-flex flex-column justify-content-center align-items-center" style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px', marginTop: '15px' }}>
                <span className="d-flex align-items-center" style={{ marginRight: '8px' }}>
                    This is Public Music Library.
                </span>
            </div>
            {error && (
                <div className="d-flex justify-content-center align-items-center" style={{ color: 'red', marginBottom: '20px' }}>
                    <h4>Loading public music library unsuccessfully, please try again later.</h4>
                </div>
            )}
            <button onClick={addToPlaylist} className="custom-button2" style={positioningStyle}>Add Selected to Playlist</button>
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
                                <input
                                    type="checkbox"
                                    checked={selectedSongs.includes(song.id)}
                                    onChange={() => toggleSongSelection(song.id)}
                                />
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
            <Modal show={showErrorModal} onHide={() => {setShowErrorModal(false); setErrorMessage(null);}}>
                <Modal.Header closeButton>
                  <Modal.Title>Error</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="error-modal-message">{errorMessage}</div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={() => {setShowErrorModal(false); setErrorMessage(null);}}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
        </div>
    );
}

export default PublicMusicLibrary;