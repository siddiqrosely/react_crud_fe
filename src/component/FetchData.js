import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';
import AddData from './AddData';

const FetchData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/v1/employee')
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

    const [employee, setEmployee] = useState({
    });

    const loadEditData = (a) => {
        setisEditOpen(true);
        setFlag("Update");
        setEmployee(a);
    };

    const reloadData = () => {
        axios.get('http://localhost:8080/api/v1/employee')
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    };

    return (
        <div className="container">
            <div>
                <h1>Fetch Data from API</h1>

                <div style={{ paddingBottom: '10px' }}>
                    <AddData

                        setBukaModal={setisEditOpen}
                        bukaModal={isEditOpen}
                        flag={flag} empData={employee}
                        setEmployee={setEmployee}
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
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {record.length === 0 ? (
                            <tr>
                                <td colSpan="4" style={{textAlign:'center'}}>Empty Record</td>
                            </tr>
                        ) : (
                            record.map((user, index) => (
                                <tr key={index}>
                                    <td>
                                        <Alert.Link href="#" onClick={() => { loadEditData(user) }}>{user.id}</Alert.Link>
                                    </td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.emailId}</td>
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

export default FetchData;
