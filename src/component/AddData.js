import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function AddData({ setBukaModal, bukaModal, flag, empData, setEmployee, reloadData }) {

    const onInputChange = (e, fieldName) => {
        const value = e.target.value;
        setEmployee({
            ...empData,
            [fieldName]: value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {

        if (flag === "Add New") {
            setEmployee({
                firstName: "",
                lastName: "",
                emailId: ""
            });
        } else {
            setEmployee(empData);
        }
    }, [bukaModal]);


    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!empData.firstName.trim()) {
            setError('First Name cannot be empty');
            return;
        }

        try {
            if (flag === 'Add New') {
                const response = await axios.post('http://localhost:8080/api/v1/employee', empData);
                console.log('Employee added:', response.data);
            } else {
                const response = await axios.put(`http://localhost:8080/api/v1/employee/${empData.id}`, empData);
                console.log('Employee updated:', response.data);
            }

            setBukaModal(false);
            reloadData();
            showSuccessMessage();

        } catch (error) {
            console.error('Error adding employee:', error);
        }
    };

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const showSuccessMessage = () => {
        setShowSuccessModal(true);
    };

    return (
        <>

            <Modal show={bukaModal} onHide={() => setBukaModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{flag} Product </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => onSubmit(e)}>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <span style={{ fontStyle: 'italic', fontSize: '13px', color: 'grey' }}>
                            Input "NULL" for null value
                        </span>

                        <Form.Group className="mb-3" controlId="addFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="First Name"
                                autoFocus
                                value={empData.firstName ?? ''}
                                onChange={(e) => onInputChange(e, 'firstName')}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="addLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Last Name"
                                value={empData.lastName ?? ''}
                                onChange={(e) => onInputChange(e, 'lastName')}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="addEmailId">

                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                value={empData.emailId ? empData.emailId : ''}
                                onChange={(e) => onInputChange(e, 'emailId')}
                            />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setBukaModal(false)}>
                        Close
                    </Button>

                    <Button variant="primary" onClick={handleSubmit}>Save</Button>

                </Modal.Footer>
            </Modal>


            <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {flag === 'Add New' ? (
                        <p>Data has been successfully added!</p>
                    ) : (
                        <p>Data has been successfully updated!</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}

export default AddData;