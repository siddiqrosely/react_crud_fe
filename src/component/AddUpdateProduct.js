import { useEffect, useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function AddUpdateProduct({ setBukaModal, bukaModal, flag, prdData, setProduct, reloadData }) {

    const onInputChange = (e, fieldName) => {
        const value = e.target.value;
        setProduct({
            ...prdData,
            [fieldName]: value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
    }

    useEffect(() => {

        if (flag === "Add New") {
            setProduct({
                productCode: "",
                productName: "",
                productCategory: "",
                productBrand: "",
                productType: "",
                productDescription: ""
            });
        } else {
            setProduct(prdData);
        }
    }, [bukaModal]);


    const [error, setError] = useState('');

    const productCodeInputRef = useRef(null);
    const productNameInputRef = useRef(null);
    const productCategoryInputRef = useRef(null);



    const handleSubmit = async (e) => {
        e.preventDefault();


        console.log(JSON.stringify(prdData));

        if (prdData.productCode.trim() === "") {
            setError('Product Code cannot be empty');
            productCodeInputRef.current.focus();
            return;
        }


        if (prdData.productName.trim() === "") {
            setError('Product Name cannot be empty');
            productNameInputRef.current.focus();
            return;
        }

        if (prdData.productCategory.trim() === "") {
            setError('Product Category cannot be empty');
            productCategoryInputRef.current.focus();
            return;
        }

        try {
            if (flag === 'Add New') {
                const response = await axios.post('http://localhost:8080/api/v1/product', prdData);
                console.log('Product added:', response.data);
            } else {

                const response = await axios.put(`http://localhost:8080/api/v1/product/${prdData.productCode}`, prdData);
                console.log('Product updated:', response.data);
            }

            setBukaModal(false);
            reloadData();
            showSuccessMessage();

        } catch (error) {
            console.error('Error adding Product:', error);
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

                        <Form.Group className="mb-3" controlId="productCode">
                            <Form.Label>Product Code*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Product Code"
                                autoFocus
                                value={prdData.productCode ?? ''}
                                onChange={(e) => onInputChange(e, 'productCode')}
                                ref={productCodeInputRef}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Product Name">
                            <Form.Label>Product Name*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Product Name"
                                value={prdData.productName ?? ''}
                                onChange={(e) => onInputChange(e, 'productName')}
                                ref={productNameInputRef}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Category">

                            <Form.Label>Category*</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Category"
                                value={prdData.productCategory ?? ''}
                                onChange={(e) => onInputChange(e, 'productCategory')}
                                ref={productCategoryInputRef}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Brand">

                            <Form.Label>Brand</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Brand"

                                value={prdData.productBrand ?? ''}
                                onChange={(e) => onInputChange(e, 'productBrand')}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Type">

                            <Form.Label>Type</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Type"

                                value={prdData.productType ?? ''}
                                onChange={(e) => onInputChange(e, 'productType')}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Description">

                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Description"
                                value={prdData.productDesc ?? ''}
                                onChange={(e) => onInputChange(e, 'productDesc')}
                                rows={3}
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

export default AddUpdateProduct;