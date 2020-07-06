import React, { Fragment } from "react";
import "./App.scss";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Loader from "./components/Loader";
import Dropdown from "react-bootstrap/Dropdown";
import moment from "moment";

function App() {
    const DropdownDays = () => {
        const listDays = [];
        for (let i = 0; i < 10; i++) {
            const day = moment().subtract(i, "days").format("MM-DD-YYYY");
            listDays.push(<Dropdown.Item>{day}</Dropdown.Item>);
        }
        return listDays;
    };
    return (
        <Fragment>
            {/* Header */}
            <div className='header bg-primary py-2'>
                <div className='container'>
                    <Navbar className='d-flex justify-content-between px-0' bg='primary' variant='dark'>
                        <Navbar.Brand href='#home'>COVID-19 Stats</Navbar.Brand>
                        <div>
                            <Button variant='light'>Statistics Of Country</Button>
                        </div>
                    </Navbar>
                </div>
            </div>

            {/* HomePage */}
            <div className='bg-primary py-5 bg-primary'>
                <div className='container'>
                    <h1 className='text-light h2'>Covid-19 Statistics Of All Countries</h1>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <Form className='w-75'>
                            <Form.Group>
                                <Form.Control type='text' placeholder='Search country' />
                            </Form.Group>
                        </Form>
                        <Dropdown>
                            <Dropdown.Toggle variant='dark'>Sort by</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item>Active: Low to High</Dropdown.Item>
                                <Dropdown.Item>Active: High to Low</Dropdown.Item>
                                <Dropdown.Item>Deaths: Low to High</Dropdown.Item>
                                <Dropdown.Item>Deaths: High to Low</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <Table className='home-page' striped bordered hover variant='dark'>
                        <thead>
                            <tr>
                                <th>Country</th>
                                <th className='text-warning'>Active</th>
                                <th className='text-danger'>Deaths</th>
                                <th className='text-success'>Recovered</th>
                                <th className='text-light'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Vietnam</td>
                                <td className='text-warning'>50</td>
                                <td className='text-danger'>0</td>
                                <td className='text-success'>300</td>
                                <td className='text-light'>350</td>
                            </tr>
                            <tr>
                                <td>China</td>
                                <td className='text-warning'>1000000</td>
                                <td className='text-danger'>5000</td>
                                <td className='text-success'>30000</td>
                                <td className='text-light'>1035000</td>
                            </tr>
                        </tbody>
                    </Table>
                    )}
                </div>
            </div>

            {/* Modal Countries List */}
            <Modal show={false}>
                <Modal.Header closeButton>
                    <Modal.Title>List Of All Countries</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className='mb-3'>
                        <FormControl placeholder='Search Country' />
                    </InputGroup>
                    <ListGroup>
                        <ListGroup.Item className='d-flex justify-content-between align-items-center'>
                            <span>Vietnam</span>
                            <Button variant='primary'>View Statistics</Button>
                        </ListGroup.Item>
                        <ListGroup.Item className='d-flex justify-content-between align-items-center'>
                            <span>Vietnam</span>
                            <Button variant='primary'>View Statistics</Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary'>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Statistics Of Country */}
            <div className='bg-primary py-5'>
                <div className='container'>
                    <Dropdown>
                        <Dropdown.Toggle variant='success'>Statistics Of Another Day</Dropdown.Toggle>
                        <Dropdown.Menu>
                            <DropdownDays />
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <hr />
                <div className='container d-flex justify-content-between'>
                    <div className='d-flex flex-column'>
                        <span className='text-light h4'>Day: 2020-06-20</span>
                        <span className='text-light h4'>Country: China</span>
                        <span className='text-light h4'>Continent: Asia</span>
                        <span className='text-light h4'>Population: 1439323776</span>
                    </div>
                    <div className='d-flex flex-column'>
                        <span className='text-warning h4'>Active: 1000000</span>
                        <span className='text-danger h4'>Deaths: 100000</span>
                        <span className='text-success h4'>Recovered: 10000</span>
                        <span className='text-secondary h4'>Total: 1000000</span>
                    </div>
                    <div className='d-flex flex-column'>
                        <span className='text-success h4'>Tests: 200000</span>
                        <span className='text-warning h4'>New: +1000</span>
                        <span className='text-danger h4'>Critical: 100</span>
                    </div>
                </div>
            </div>

            <Loader />
        </Fragment>
    );
}

export default App;
