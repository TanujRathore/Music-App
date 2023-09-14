import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import backgroundImage from '../images/bluebackground.png';
import LogoutNavbar from '../navibars/LogoutNavbar';
import StaffNavbar from '../navibars/StaffNavbar';
import backButtonIcon from '../images/back-button-icon.png';
import { IconContext } from 'react-icons';
import { FaHeart, FaTrash } from 'react-icons/fa';
import axios from 'axios';

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

    const [errorMessage, setErrorMessage] = useState("");

    const toggleLove = async (index) => {
        const song = songs[index];
        try {
            const response = await axios.post('/api/toggleLove', { //API wrong
                songId: song.id,
                userId: username,
                playlistName: playlistName
            });
            if (response.data.success) {
                const updatedSongs = [...songs];
                updatedSongs[index].loved = !updatedSongs[index].loved;
                setSongs(updatedSongs);
            } else {
                console.error('Failed to toggle love status');
            }
        } catch (error) {
            console.error('There was an error sending the request', error);
            setErrorMessage("Loved song failed, please try again later.");
        }
    };

    const deleteSong = async (index) => {
        const song = songs[index];
        try {
            const response = await axios.delete(`/api/deleteSong/${song.id}`, { //API wrong
                data: { userId: username ,playlistName: playlistName}
            });
            if (response.data.success) {
                const updatedSongs = [...songs];
                updatedSongs.splice(index, 1);
                setSongs(updatedSongs);
            } else {
                console.error('Failed to delete the song');
            }
        } catch (error) {
            console.error('There was an error sending the request', error);
            setErrorMessage("delete song failed, please try again later");
        }
    };

    useEffect(() => {
        axios.get(`/api/playlists/${username}/${playlistName}`) //API wrong
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
    }, [playlistName, username]);

    const buttonStyle = {
        padding: '10px 20px',
        margin: '0 10px',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
    };

    return (
        <div style={backgroundStyle}>
            {localUserRole === "staff" ? <StaffNavbar /> : <LogoutNavbar />}

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <div className="d-flex justify-content-center align-items-center" style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>
                {residentDetail && residentDetail.firstname ? `Hello ! ${residentDetail.firstname} ${residentDetail.lastname}` : 'Hello!'}
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{ marginBottom: '20px' }}>
                <h3>Now playing: {playlistName.replace("_", " ")}</h3>
            </div>
            {error && (
                <div className="d-flex justify-content-center align-items-center" style={{ color: 'red', marginBottom: '20px' }}>
                    <h4>Loading playlist unsuccessfully, please try again later.</h4>
                </div>
            )}
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
                                <IconContext.Provider value={{ color: song.loved ? 'red' : 'black' }}>
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








