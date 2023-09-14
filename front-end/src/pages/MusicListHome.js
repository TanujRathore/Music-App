import React, { useEffect, useContext, useState } from 'react';
import UserContext from '../usercontext';
import { useParams, Link } from 'react-router-dom';
import backgroundImage from '../images/bluebackground.png';
import LogoutNavbar from '../navibars/LogoutNavbar';
import StaffNavbar from '../navibars/StaffNavbar';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import morningMotivation from '../images/morning-motivation.png';
import dailyActivityBackground from '../images/daily-Activity-background.png';
import afternoonRelax from '../images/afternoon-relax.png';
import sleepPreparation from '../images/sleep-preparation.jpg';

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

    const playlistImages = [
        morningMotivation,
        dailyActivityBackground,
        afternoonRelax,
        sleepPreparation
    ];
    console.log("localUserRole:", localUserRole);
    console.log("residentDetail:", residentDetail);
    const linkState = {
        userRole: localUserRole,
        residentDetail: residentDetail
    };

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
                                    state: linkState
                                }}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                            >
                                <Card style={{ width: '18rem', height: '500px', marginBottom: '20px' }}>
                                    <Card.Img variant="top" src={playlistImages[index]} style={{ borderRadius: "50%", width: '150px', height: '150px', margin: 'auto', marginTop: '50px' }} />
                                    <Card.Body style={{ marginTop: '180px' }}>
                                        <Card.Title className="text-center" style={{ fontSize: '25px', marginBottom: '10px' }}>{playlistName}</Card.Title>
                                    </Card.Body>
                                </Card>
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
}
