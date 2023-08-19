import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import backgroundImage from '../images/bluebackground.png';
import HomeNavbar from '../components/HomeNavbar';
import addResidentImage from '../images/plus.png';

function ResidentPage() {
  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };
  const [residents, setResidents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newResidentName, setNewResidentName] = useState('');
  const [newResidentPhoto, setNewResidentPhoto] = useState(null); // State to track new resident photo

  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL)
      .then(response => {
        setResidents(response.data); // Assuming the response is an array of residents
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const filteredResidents = residents.filter(resident =>
    resident.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    setShowAddForm(true);
  };

  const handleFormSubmit = () => {
    //not sure URL   PHOTOPATH?
    axios.post(process.env.REACT_APP_BACKEND_URL, {
      name: newResidentName,
      photoUrl: `${process.env.REACT_APP_PHOTOPATH}/${newResidentPhoto}`
    })
      .then(response => {
        // Assuming the response contains the newly added resident
        const newResident = response.data;
        setResidents([...residents, newResident]);
        setNewResidentName('');
        setNewResidentPhoto(null);
        setShowAddForm(false);
      })
      .catch(error => {
        console.error('Error adding resident:', error);
      });
  };

  return (
    <div>
      <HomeNavbar />
      <div style={backgroundStyle} className="d-flex flex-column">
      <Container>
          <h1 className="mb-4 text-center" style={{ color: '#fff', fontSize: '50px', fontWeight: 'bold' }}>
            Welcome to Staff Page
          </h1>
          <Form>
            <Form.Group controlId="searchTerm">
              <Form.Label className="mb-2"> Please enter the resident name to access to their own home page</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name here"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="mb-3"
              />
            </Form.Group>
          </Form>
          <Row>
            {filteredResidents.map(resident => (
              <Col key={resident.id} md={3} sm={6} xs={12}>
                <Card className="mb-4">
                  <div className="resident-photo">
                    <img src={resident.photoUrl} alt={resident.name} />
                  </div>
                  <Card.Body>
                    <Card.Title>{resident.name}</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="add-resident-button" onClick={handleAddClick}>
            <img src={addResidentImage} alt="Add Resident" />
          </div>
          <Modal show={showAddForm} onHide={() => setShowAddForm(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Resident</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="newResidentName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={newResidentName}
                    onChange={e => setNewResidentName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="newResidentPhoto">
                  <Form.Label>Photo URL</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter photo URL"
                    value={newResidentPhoto}
                    onChange={e => setNewResidentPhoto(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAddForm(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleFormSubmit}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
      </div>
    </div>
  );
}

export default ResidentPage;