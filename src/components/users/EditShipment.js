import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory, useParams } from "react-router-dom";

const EditShipment = () => {
    let history = useHistory();
    const { id } = useParams();
    const [shipment, setShipment] = useState({
        name: "",
        userId: "",
        destination: "",
        origin: "",
        year: ""
    });

    const { name, userId, destination, origin, mode } = shipment;
    const onInputChange = e => {
        setShipment({ ...shipment, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        loadShipment();
    }, []);

    const onSubmit = async e => {
        e.preventDefault();
        await axios.put(`http://localhost:8900/shipments/${id}`, shipment);
        history.push("/");
    };

    const loadShipment = async () => {
        const result = await axios.get(`http://localhost:8900/shipments/${id}`);
        setShipment(result.data);
    };

    return (
        <div className="container" style={{marginTop: '2%'}}>
            <div className="w-75 mx-auto shadow p-5">
                <Link className="btn btn-primary" to="/">
                      back to Home</Link>
                <h2 className="text-center mb-4">Edit A Shipment</h2>
                <form onSubmit={e => onSubmit(e)}>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Your Name"
                        name="name"
                        value={name}
                        onChange={e => onInputChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="userId"
                        className="form-control form-control-lg"
                        placeholder="Enter New User-id Address"
                        name="userId"
                        value={userId}
                        onChange={e => onInputChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter New destination"
                        name="destination"
                        value={destination}
                        onChange={e => onInputChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter New origin"
                        name="origin"
                        value={origin}
                        onChange={e => onInputChange(e)}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Mode"
                        name="mode"
                        value={mode}
                        onChange={e => onInputChange(e)}
                      />
                    </div> <br/>
                  <button className="btn btn-warning btn-block">Update Shipment</button>
                </form>
            </div>
        </div>
    );
};

export default EditShipment;
