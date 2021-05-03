import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const Shipment = () => {

    const [shipment, setShipment] = useState({
      name: "",
      userId: "",
      origin: "",
      destination: "",
      mode: "",
      type: "",
      total: "",
      status: "",
    });

    const { id } = useParams();
    useEffect(() => {
      loadShipment();
    }, []);

    const loadShipment = async () => {
      const res = await axios.get(`http://localhost:8900/shipments/${id}`);
      setShipment(res.data);
    };
    return (
        <div className="container py-4 shipment">
            <Link className="btn btn-primary" to="/">
              back to Home
            </Link>
            <h1 className="display-4" style={{marginLeft: '35%'}}>User Id: {id}</h1>
            <hr />
            <ul className="list-group w-50" style={{marginLeft: '25%'}}>
                  <li className="list-group-item">name: {shipment.name}</li>
                  <li className="list-group-item">origin: {shipment.origin}</li>
                  <li className="list-group-item">destination: {shipment.destination}</li>
                  <li className="list-group-item">Total: {shipment.total}</li>
                  <li className="list-group-item">Status: {shipment.status}</li>
                  <li className="list-group-item">Mode: {shipment.mode}</li>
                  <li className="list-group-item">Type: {shipment.type}</li>
            </ul>
        </div>
    );
};

export default Shipment;