import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BathtubIcon from '@material-ui/icons/Bathtub';
import HotelIcon from '@material-ui/icons/Hotel';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import HomeIcon from '@material-ui/icons/Home';


import DemoCarousel from '../UI/Carousel/Carousel';
import Map from '../UI/Map/Map';


const useStyles = makeStyles(theme => ({
    card: {
        boxShadow: `1px 1px 10px grey`,
        height: '100%',
        width: '100%',
    },
    conteneir: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        },
    },
    media: {
        height: '60%',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            height: '100%',
            width: '50%'
        },
    },
    content: {
        height: '40%',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            height: '100%',
            width: '50%'
        },
    },
}));


const Detail = props => {
    const classes = useStyles();
    const [imovel, setImovel] = useState(props.history.location.imovel);
    const [images, setImages] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (imovel) {
            setImages(imovel.images)
            setIsLoading(false)
        }
    }, [imovel])


    useEffect(() => {
        if (imovel === undefined) {
            setIsLoading(true)
            axios.get('http://5e148887bce1d10014baea80.mockapi.io/keycash/challenge')
                .then(res => {
                    const id = props.history.location.pathname.split('/')
                    const result = res.data.find(imovel => imovel.id === id[2])
                    setImovel(result)
                    setImages(result.images)
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setIsLoading(false)
                })
        }
    }, [imovel, props.history.location.pathname])

    let content = (
        <CircularProgress color="primary" />
    );

    if (!isLoading) {
        content = (
            <Card className={classes.card}>
                <div className={classes.conteneir}>

                    <div className={classes.media}>
                        <DemoCarousel images={images} address={imovel.address.formattedAddress} />
                    </div>

                    <CardContent className={classes.content}>
                        <Typography component="p" variant="button" gutterBottom>
                            {imovel.address.formattedAddress}
                        </Typography>
                        <Typography variant="body1" component='p' color="textSecondary" >
                            <AttachMoneyIcon color='primary' />{` R$ ${imovel.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
                        </Typography>
                        <Typography variant="body1" component='p' color="textSecondary">
                            <BathtubIcon color='primary' />{` ${imovel.bathrooms}`}
                        </Typography>
                        <Typography variant="body1" component='p' color="textSecondary">
                            <HotelIcon color="primary" />{` ${imovel.bedrooms}`}
                        </Typography>
                        <Typography variant="body1" component='p' color="textSecondary">
                            <DriveEtaIcon color="primary" />{` ${imovel.parkingSpaces}`}
                        </Typography>
                        <Typography variant="body1" component='p' color="textSecondary">
                            <HomeIcon color="primary" />{` ${imovel.usableArea}m²`}
                        </Typography>
                    </CardContent>
                </div>
                <Map lat={imovel.address.geolocation.lat} lng={imovel.address.geolocation.lng} />

            </Card>

        );
    }

    return (
        <>

            {content}

        </>
    );
}
export default Detail;