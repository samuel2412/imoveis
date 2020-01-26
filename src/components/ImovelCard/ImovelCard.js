import React from 'react';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


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


const ImovelCard = props => {
    const classes = useStyles();
    const { imovel } = props;


    return (
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
export default ImovelCard;