import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import AddUpdateProduct from './AddUpdateProduct';

const ProductData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/product')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const record = data.slice(firstIndex, lastIndex);
    const nPage = Math.ceil(data.length / recordsPerPage);
    const numbers = [...Array(nPage).keys()].map((num) => num + 1);

    const bil = (currentPage - 1) * recordsPerPage;


    const firstPage = () => {
        setCurrentPage(1);
    };

    const prePage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const changeCPage = (id) => {
        setCurrentPage(id);
    };

    const nextPage = () => {
        if (currentPage < nPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const lastPage = () => {
        setCurrentPage(nPage);
    };


    const [isEditOpen, setisEditOpen] = useState(false);

    const [flag, setFlag] = useState("");

    const [product, setProduct] = useState({
    });

    const loadEditData = (a) => {
        setisEditOpen(true);
        setFlag("Update");
        setProduct(a);
    };

    const reloadData = () => {
        axios.get('http://localhost:8080/api/v1/product')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    };

    return (
        <div className="container">
            <div>
                <h1>Fetch Data from Product API</h1>

                <div style={{ paddingBottom: '10px' }}>
                    <AddUpdateProduct

                        setBukaModal={setisEditOpen}
                        bukaModal={isEditOpen}
                        flag={flag}
                        prdData={product}
                        setProduct={setProduct}
                        reloadData={reloadData}
                    />
                    <Button variant="primary" onClick={() => { setisEditOpen(true); setFlag("Add New") }}>
                        Add New
                    </Button>

                </div>

                <Table striped bordered hover responsive>
                    <thead className='thead-dark'>
                        <tr>
                            <th>ID</th>
                            <th>Product Code</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Type</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {record.length === 0 ? (
                            <tr>
                                <td colSpan="7" style={{ textAlign: 'center' }}>Empty Record</td>
                            </tr>
                        ) : (
                            record.map((prod, index) => (
                                <tr key={index}>
                                    <td>{bil + index + 1}</td>  
                                    <td> <Alert.Link href="#" onClick={() => { loadEditData(prod) }}>{prod.productCode}</Alert.Link></td>
                                    <td>{prod.productName}</td>
                                    <td>{prod.productCategory}</td>
                                    <td>{prod.productBrand}</td>
                                    <td>{prod.productType}</td>
                                    <td>{prod.productDesc}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>

                <nav>
                    {<ul className="pagination">

                        <li className="page-item">
                            <button className="page-link" onClick={firstPage}>First</button>
                        </li>

                        <li className="page-item">
                            <button className="page-link" onClick={prePage}>Previous</button>
                        </li>
                        {numbers.map((n, i) => (
                            <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
                                <button className="page-link" onClick={() => changeCPage(n)}>{n}</button>
                            </li>
                        ))}
                        <li className="page-item">
                            <button className="page-link" onClick={nextPage}>Next</button>
                        </li>


                        <li className="page-item">
                            <button className="page-link" onClick={lastPage}>Last</button>
                        </li>
                    </ul>}
                </nav>
            </div>
        </div>
    );
};

export default ProductData;
