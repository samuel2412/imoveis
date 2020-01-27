import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import BathtubIcon from '@material-ui/icons/Bathtub';
import HotelIcon from '@material-ui/icons/Hotel';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import HomeIcon from '@material-ui/icons/Home';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import IconButton from '@material-ui/core/IconButton';



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
        /*  [theme.breakpoints.up('sm')]: {
             flexDirection: 'row'
         }, */
    },
    content: {
        margin: 'auto',
        textAlign: 'center',

    },
    iconsGroup: {
        display: 'flex',
        flex: 1,
        justifyContent: 'space-between',
        marginTop: theme.spacing(2),
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row'
        },
    },
    details: {
        textTransform: 'uppercase',
        margin: theme.spacing(2),
        flexDirection: 'column',
    },
    icon: {
        display: 'flex',
        margin: 'auto'
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

    const onClickHandler = () => {
        props.history.push('/');
    }

    let content = (
        <CircularProgress color="primary" />
    );

    if (!isLoading) {
        content = (
            <Card className={classes.card}>
                <div className={classes.conteneir}>

                    <div className={classes.media}>
                        <DemoCarousel style={{ maxHeight: '70vh' }} images={images} address={imovel.address.formattedAddress} />
                    </div>
                    <CardContent className={classes.content}>

                        <Typography component="p" variant="button" gutterBottom>
                            {imovel.address.formattedAddress}
                        </Typography>

                        <Grid container direction="row" justify="center" alignItems="center">

                            <div className={classes.iconsGroup}>

                                <div className={classes.details}>
                                    <AttachMoneyIcon className={classes.icon} color='primary' />
                                    <Typography variant="body1" component='p' color="textSecondary" >
                                        {`R$ ${imovel.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
                                    </Typography>
                                    <Typography variant="caption" component='p' color="textSecondary" >
                                        {`preço`}
                                    </Typography>
                                </div>

                                <div className={classes.details}>
                                    <BathtubIcon className={classes.icon} color='primary' />
                                    <Typography variant="body1" component='p' color="textSecondary" >
                                        {`${imovel.bathrooms}`}
                                    </Typography>
                                    <Typography variant="caption" component='p' color="textSecondary" >
                                        {`banheiro(s)`}
                                    </Typography>
                                </div>


                                <div className={classes.details}>
                                    <HotelIcon className={classes.icon} color="primary" />
                                    <Typography variant="body1" component='p' color="textSecondary" >
                                        {`${imovel.bedrooms}`}
                                    </Typography>
                                    <Typography variant="caption" component='p' color="textSecondary" >
                                        {`quarto(s)`}
                                    </Typography>
                                </div>

                                <div className={classes.details}>
                                    <DriveEtaIcon className={classes.icon} color="primary" />
                                    <Typography variant="body1" component='p' color="textSecondary" >
                                        {`${imovel.parkingSpaces}`}
                                    </Typography>
                                    <Typography variant="caption" component='p' color="textSecondary" >
                                        {`vaga(s)`}
                                    </Typography>
                                </div>

                                <div className={classes.details}>
                                    <HomeIcon className={classes.icon} color="primary" />
                                    <Typography variant="body1" component='p' color="textSecondary" >
                                        {`${imovel.usableArea}m²`}
                                    </Typography>
                                    <Typography variant="caption" component='p' color="textSecondary" >
                                        {`área utíl`}
                                    </Typography>
                                </div>


                            </div>

                        </Grid>

                    </CardContent>

                </div>
                <Map lat={imovel.address.geolocation.lat} lng={imovel.address.geolocation.lng} />
                <CardActions >
                    <IconButton style={{ marginRight: 'auto' }} color="primary" onClick={() => onClickHandler()}>
                        <ArrowBackIosIcon />
                    </IconButton>
                </CardActions>
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