import React from 'react';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';

import DemoCarousel from '../UI/Carousel/Carousel'


const useStyles = makeStyles(theme => ({
    card: {
        boxShadow: `1px 1px 10px grey`,
        height: '100%',
        maxWidth: 400,
        minWidth: 225,
    },
    conteneir: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    media: {
        height: '300px',
        width: '100%',
    },
    content: {
        height: '40%',
        width: '100%',
    },
    someDetails: {
        display: 'flex',
        justifyContent: 'space-around',
        textAlign: 'bottom',
    },
}));


const ImovelCard = props => {
    const classes = useStyles();
    const { imovel, onClickHandler } = props;


    return (
        <Card className={classes.card}>

            <div className={classes.conteneir}>


                <DemoCarousel images={imovel.images} address={imovel.address.formattedAddress} />

                <CardContent className={classes.content}>
                    <Typography component="p" variant="button" gutterBottom>
                        {imovel.address.formattedAddress}
                    </Typography>

                    <Typography className={classes.someDetails} variant="body1" component='span' color="textSecondary" >
                        <AttachMoneyIcon color='primary' />{` R$ ${imovel.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`}
                        <HomeIcon color="primary" />{` ${imovel.usableArea}m²`}
                    </Typography>

                </CardContent>
                <CardActions >
                    <IconButton style={{marginLeft: 'auto'}} color="primary"onClick={() => onClickHandler(imovel.id)}>
                        <AddIcon/>
                    </IconButton>
                </CardActions>
            </div>
        </Card >

    );
}
export default ImovelCard;
//   onClick={() => onClickHandler(imovel.id)}>