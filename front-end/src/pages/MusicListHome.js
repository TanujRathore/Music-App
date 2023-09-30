import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Col, Row, Modal, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import axios from 'axios';

import backgroundImage from '../images/bluebackground.png';
import LogoutNavbar from '../navibars/LogoutNavbar';
import StaffNavbar from '../navibars/StaffNavbar';

import morningMotivation from '../images/morning-motivation.png';
import dailyActivityBackground from '../images/daily-Activity-background.png';
import afternoonRelax from '../images/afternoon-relax.png';
import sleepPreparation from '../images/sleep-preparation.jpg';
import changeimage from '../images/changeimage.png';

export default function MusicListHome() {
    const { username } = useParams();
    const localUserRole = localStorage.getItem('userRole');
    const backgroundStyle = {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
    };

    const [residentDetail, setResidentDetail] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(null);
    const [playlistImages, setPlaylistImages] = useState([
        morningMotivation,
        dailyActivityBackground,
        afternoonRelax,
        sleepPreparation
    ]);

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

        // Fetch the actual playlist images from the database
        const fetchPlaylistImages = async () => {
            try {
                const response = await axios.get('YOUR_API_URL_TO_FETCH_PLAYLIST_IMAGES'); // Please fill this URL
                if (response.data && response.data.images) {
                    setPlaylistImages(response.data.images);
                }
            } catch (error) {
                console.error('Error fetching playlist images:', error);
            }
        };
        fetchPlaylistImages();

    }, [username]);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
        setShowModal(true);
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await axios.post('http://127.0.0.1:8000/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            const updatedImages = [...playlistImages];
            updatedImages[selectedImageIndex] = response.data.filepath;
            setPlaylistImages(updatedImages);

            // Save the updated image URL to the database
            try {
                await axios.put('YOUR_API_URL_TO_SAVE_PLAYLIST_IMAGE', {
                    playlistIndex: selectedImageIndex,
                    imageUrl: response.data.filepath
                });
            } catch (error) {
                console.error("Error saving the image URL to the database:", error);
            }

            setShowModal(false);
        } catch (error) {
            console.error("Error uploading the image:", error);
        }
    }

    return (
        <div>
            {localUserRole === "staff" ? <StaffNavbar /> : <LogoutNavbar />}
            <div style={{ position: 'absolute', top: '120px', left: '80px', color: 'black', fontSize: '30px', fontWeight: 'bold' }}>
                {residentDetail && residentDetail.firstname ? `Hello ! ${residentDetail.firstname} ${residentDetail.lastname}` : 'Hello!'}
            </div>
            <div style={backgroundStyle} className="d-flex justify-content-center align-items-center">
                <Row>
                    {["Morning Motivation", "Daily Activity", "Afternoon Relaxation", "Sleep Preparation"].map((playlistName, index) => (
                        <Col md={3} key={index}>
                            <Link
                                to={{
                                    pathname: `/MusicListHome/${username}/${playlistName.replace(" ", "_")}`,
                                }}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <Card style={{ width: '18rem', height: '500px', marginBottom: '20px', position: 'relative' }}>
                                    <div style={{ position: 'relative', margin: 'auto', width: '150px', height: '150px', marginTop: '50px' }}>
                                        <Card.Img variant="top" src={playlistImages[index]} style={{ borderRadius: "50%", width: '100%', height: '100%' }} />

                                        <OverlayTrigger
                                            placement="top"
                                            overlay={
                                                <Tooltip>
                                                    Upload new iamge
                                                </Tooltip>
                                            }
                                        >
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    bottom: 0,
                                                    right: 0,
                                                    zIndex: 10,
                                                    cursor: 'pointer',
                                                    width: '30px',
                                                    height: '30px',
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    handleImageClick(index);
                                                }}
                                            >
                                                <img src={changeimage} alt="Edit" style={{ width: '100%', height: '100%' }} />
                                            </div>
                                        </OverlayTrigger>
                                    </div>

                                    <Card.Body style={{ marginTop: '120px' }}>
                                        <Card.Title className="text-center" style={{ fontSize: '25px', marginBottom: '10px' }}>{playlistName}</Card.Title>
                                    </Card.Body>
                                </Card>


                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload new image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input type="file" onChange={handleFileChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
