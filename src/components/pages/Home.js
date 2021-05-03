import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useStyles from "./styles";
import {Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography, Avatar, CardHeader, Grow, Grid} from "@material-ui/core"

// card icon pic
const avatar = "https://alan.app/voice/images/branding_page/icon/color/alan-logo-icon-color.png"

const profile = "https://images.unsplash.com/photo-1586083702768-190ae093d34d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=395&q=80"

const Home = () => {
    const classes = useStyles();

    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        loadShipments();
    }, []);

    const loadShipments = async () => {
        const result = await axios.get("http://localhost:8900/shipments");
        setShipments(result.data.reverse());
    };


    const [searchTerm, setSearchTerm] = useState("")

    return (
        <>
            <input
            type="text"
            className="form-control form-control-lg w-50"
            placeholder="Search..."
            style={{margin: "20px", display: "inline-block"}}
            onChange={(e) =>{ setSearchTerm(e.target.value)}}
            />

            {/* name filter */}
            <select onChange={(e) =>{ setSearchTerm(e.target.value)}} className="form-select w-25" style={{display: "inline-block", height: "40px", margin: "20px",}}>
            {
            shipments.map((shipment) =>{
                return(
                    <option value={shipment.name}>
                        {shipment.name}
                    </option>
                )
            })
            }
            </select>


        <Grow in>
            <Grid
            container
            alignitem="stretch"
            spacing={3}
            >
                {shipments.filter((shipment) => {
                    if (searchTerm === "") {
                        return shipment;
                    } else if (
                        shipment.name.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                        return shipment;
                    } else if (shipment.id.includes(searchTerm)) {
                        return shipment;
                    }
                }).map((shipment) => (
                    <Grid
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    key={shipment.id}
                    >
                        <Card>
                            <CardHeader
                                avatar={
                                <Avatar aria-label="recipe">
                                    <img src={avatar} alt="avatar" height="45px"/>
                                </Avatar>
                                }
                                title={shipment.name}
                            />
                            <CardMedia
                                className={classes.media}
                                image={shipment.pic || profile}
                            />
                            <CardContent>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        <b>NAME---</b>{shipment.name} <br/>
                                        <b>USERID---</b>{shipment.userId} <br/>
                                        <b>DESTINATION--</b>{shipment.destination} <br/>
                                        <b>ORIGIN---</b>{shipment.origin} <br/>
                                    </Typography>
                            </CardContent>

                            <CardActions disableSpacing>
                            <CardActionArea>
                                    <Link to={`/shipments/${shipment.id}`}>
                                        <Button size="small" color="primary">View</Button>
                                    </Link>

                                    <Link to={`/shipments/edit/${shipment.id}`}>
                                        <Button size="small" color="primary" >Update</Button></Link>


                            </CardActionArea>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Grow>
    </>
    );
};

export default Home;