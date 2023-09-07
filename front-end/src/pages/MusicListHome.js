import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 引入useParams
import backgroundImage from '../images/bluebackground.png';
import LogoutNavbar from '../navibars/LogoutNavbar'; 
import StaffNavbar from '../navibars/StaffNavbar';
import jwt_decode from 'jwt-decode'; 
import axios from 'axios';
import {Card,Col,Row} from 'react-bootstrap';
import morningMotivation from '../images/morning-motivation.png';
import dailyActivityBackground from '../images/daily-Activity-background.png';
import afternoonRelax from '../images/afternoon-relax.png';
import sleepPreparation from '../images/sleep-preparation.jpg';


export default function MusicListHome() {
  const { username } = useParams(); // 获取从路由中传递的resident用户名

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };
  const [userRole, setUserRole] = useState(null);
  const [residentDetail, setResidentDetail] = useState({});

  useEffect(() => {
    const fetchUserRole = () => {
        const token = localStorage.getItem('userTokens');
        if (token) {
            try {
                const decoded = jwt_decode(token);
                if (decoded && decoded.role) {
                    setUserRole(decoded.role);
                }
            } catch (error) {
                console.error('Error decoding the token:', error);
            }
        }
    }
    // 根据username获取resident信息的函数
    const fetchResidentDetails = (username) => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/resident/${username}`)
            .then(response => {
                setResidentDetail(response.data);
            })
            .catch(error => {
                console.error('Error fetching resident details:', error);
            });
    }

    fetchUserRole();         // 获取用户角色
    fetchResidentDetails(username);  // 根据username获取resident信息
}, [username]);  // 当username变化时，这个effect会重新运行

//   useEffect(() => {
//     const fetchUserRole = () => {
//         const token = localStorage.getItem('userTokens');
//         if (token) {
//             try {
//                 const decoded = jwt_decode(token);
//                 if (decoded && decoded.role) {
//                     setUserRole(decoded.role);
//                 }
//             } catch (error) {
//                 console.error('Error decoding the token:', error);
//             }
//         }
//     }

//     // 模拟后端返回的resident信息
//     const fetchResidentDetails = (username) => {
//         setTimeout(() => {
//             const mockData = {
//                 firstname: 'John',
//                 lastname: 'Doe'
//             };
//             setResidentDetail(mockData);
//         }, 100); 
//     }

//     fetchUserRole();         
//     fetchResidentDetails(username);  
// }, [username]);  

const playlistImages = [
    morningMotivation,
    dailyActivityBackground,
    afternoonRelax,
    sleepPreparation
];

return (
    <div>
        {userRole === "staff" ? <StaffNavbar /> : <LogoutNavbar />}
        <div style={{ position: 'absolute', top: '120px', left: '40px', color: 'black', fontSize: '40px' , fontWeight: 'bold'}}>
            {residentDetail.firstname && `Hello, ${residentDetail.firstname} ${residentDetail.lastname}!`}
        </div>
        <div style={backgroundStyle} className="d-flex justify-content-center align-items-center">
            <Row>
                {["Playlist 1", "Playlist 2", "Playlist 3", "Playlist 4"].map((playlistName, index) => (
                    <Col md={3} key={index}>
                        <Card style={{ width: '18rem', height: '500px', marginBottom: '20px' }}>
                            <Card.Img variant="top" src={playlistImages[index]} style={{borderRadius: "50%", width: '150px', height: '150px', margin: 'auto', marginTop: '50px'}} />
                            <Card.Body style={{ marginTop: '180px' }}>
                                <Card.Title className="text-center" style={{ fontSize: '25px', marginBottom: '10px' }}>{playlistName}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    </div>
);

}

