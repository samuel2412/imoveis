import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
    card: {
        boxShadow: `1px 1px 10px grey`,
        height: 500,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            height: 300,
        },
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
    const [isLoading, setIsLoading] = useState(true);

    /* console.log(props.history)
    console.log(props.history.location.pathname.split('/')) */

    useEffect(() => {
        if (imovel) {
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
                    setIsLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setIsLoading(false)
                })
        }
    }, [imovel,props.history.location.pathname])





    let content = (
        <CircularProgress color="primary" />
    );

    if (!isLoading) {
        content = (
            <Card className={classes.card}>
                <CardActionArea className={classes.conteneir}>
                    <CardMedia
                        className={classes.media}
                        component="img"
                        image={imovel.images[0]}
                        alt={`Imóvel na ${imovel.address.formattedAddress}`}
                        title={`Imóvel na ${imovel.address.formattedAddress}`}
                    />
                    <CardContent className={classes.content}>
                        <Typography component="p" variant="button" gutterBottom>
                            {imovel.address.formattedAddress}
                        </Typography>
                        <Typography variant="body1" component='p' color="textSecondary" >
                            {`Preço: ${imovel.price}`}
                        </Typography>
                        <Typography variant="body1" component='p' color="textSecondary">
                            {`Banheiro(s): ${imovel.bathrooms}`}
                        </Typography>
                        <Typography variant="body1" component='p' color="textSecondary">
                            {`Quarto(s): ${imovel.bedrooms}`}
                        </Typography>
                        <Typography variant="body1" component='p' color="textSecondary">
                            {`Vagas(s): ${imovel.parkingSpaces}`}
                        </Typography>
                        <Typography variant="body1" component='p' color="textSecondary">
                            {`Área: ${imovel.usableArea}m`}
                        </Typography>
                    </CardContent>
                </CardActionArea>

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