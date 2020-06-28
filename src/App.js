import React, { Fragment, useState, useEffect } from "react";
import "./App.scss";
import Navbar from "react-bootstrap/Navbar";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Loader from "./components/Loader";

function App() {
    const [statistics, setStatistics] = useState([]);
    const [countries, setCountries] = useState([]);
    const [isLoadingStatistics, setIsLoadingStatistics] = useState(false);
    const [isLoadingCountries, setIsLoadingCountries] = useState(false);
    const [modalCountryOpening, setModalCountryOpening] = useState(false);

    useEffect(() => {
        getStatistics();
    }, [statistics.length]);

    const getStatistics = async () => {
        setIsLoadingStatistics(true);
        fetch("https://covid-193.p.rapidapi.com/statistics", {
            method: "GET",
            headers: { "x-rapidapi-host": "covid-193.p.rapidapi.com", "x-rapidapi-key": "db0d3fc08amshc4197240e38cd89p1931f5jsnf44535148a7f" },
        })
            .then((response) => response.json())
            .then((res) => {
                setStatistics(res.response);
                setIsLoadingStatistics(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const getCountries = () => {
        setIsLoadingCountries(true);
        fetch("https://covid-193.p.rapidapi.com/countries", {
            method: "GET",
            headers: {
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
                "x-rapidapi-key": "db0d3fc08amshc4197240e38cd89p1931f5jsnf44535148a7f",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                setCountries(res.response);
                setIsLoadingCountries(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const openModalCountry = () => {
        setModalCountryOpening(true);
        getCountries();
    };

    return (
        <Fragment>
            <div className='header bg-primary py-2'>
                <div className='container'>
                    <Navbar className='d-flex justify-content-between px-0' bg='primary' variant='dark'>
                        <Navbar.Brand href='#home'>COVID-19 Stats</Navbar.Brand>
                        <div>
                            <Button onClick={openModalCountry} variant='light'>
                                Statistics Of Country
                            </Button>
                        </div>
                    </Navbar>
                </div>
            </div>

            {/* HomePage */}
            <div className='bg-primary py-5 bg-primary home-page'>
                <div className='container'>
                    <h1 className='text-light h2'>Covid-19 Statistics Of All Countries</h1>
                    <hr />
                    {isLoadingStatistics ? (
                        <div className='text-center'>
                            <Loader />
                        </div>
                    ) : (
                        <Fragment>
                            <InputGroup className='mb-3'>
                                <FormControl placeholder='Search Country' />
                            </InputGroup>
                            <Table className='table' striped bordered hover variant='dark'>
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
                                    {statistics.map((stat) => (
                                        <tr key={stat.country}>
                                            <td>{stat.country}</td>
                                            <td className='text-warning'>{stat.cases.active}</td>
                                            <td className='text-danger'>{stat.deaths.total}</td>
                                            <td className='text-success'>{stat.cases.recovered}</td>
                                            <td className='text-light'>{stat.cases.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Fragment>
                    )}
                    )}
                </div>
            </div>

            {/* Modal Countries List */}
            <Modal show={modalCountryOpening}>
                <Modal.Header closeButton>
                    <Modal.Title>List Of All Countries</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className='mb-3'>
                        <FormControl placeholder='Search Country' />
                    </InputGroup>
                    <ListGroup>
                        {isLoadingCountries ? (
                            <div className='text-center'>
                                <Loader fill='#1f4287' />
                            </div>
                        ) : (
                            countries.map((country) => (
                                <ListGroup.Item className='d-flex justify-content-between align-items-center'>
                                    <span>{country}</span>
                                    <Button variant='primary'>View Statistics</Button>
                                </ListGroup.Item>
                            ))
                        )}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary'>Close</Button>
                </Modal.Footer>
            </Modal>

            {/* Statistics Of Country */}
            <div className='bg-primary py-5'>
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
        </Fragment>
    );
}

export default App;
