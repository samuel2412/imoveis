import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(theme => ({
    card: {
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
        height: '50%',
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            height: '100%',
            width: '50%'
        },
    },
    content: {
        height: '50%',
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
                    alt="Contemplative Reptile"
                    image={imovel.images[0]}
                    title="Contemplative Reptile"
                />
                <CardContent className={classes.content}>
                    <Typography component="p" variant="button" gutterBottom>
                        {imovel.address.formattedAddress}
                    </Typography>
                    <Typography variant="body1" component='p' >
                        {`Preço: ${imovel.price}`}
                    </Typography>
                    <Typography variant="body1" component='p' >
                        {`Banheiro(s): ${imovel.bathrooms}`}
                    </Typography>
                    <Typography variant="body1" component='p' >
                        {`Quarto(s): ${imovel.bedrooms}`}
                    </Typography>
                    <Typography variant="body1" component='p' >
                        {`Vagas(s): ${imovel.parkingSpaces}`}
                    </Typography>
                    <Typography variant="body1" component='p' >
                        {`Área: ${imovel.usableArea}m`}
                    </Typography>
                </CardContent>
            </CardActionArea>
           
        </Card>

    );
}
export default ImovelCard;