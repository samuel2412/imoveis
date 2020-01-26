import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


import ImoveisList from '../../components/ImoveisList/ImoveisList';

const useStyles = makeStyles(theme => ({
    content: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row'
        },
    },
    main: {
        flex: 1
    },
    sideMenu: {
        display: 'flex',
        flexDirection: 'row',
        textAlign: 'bottom',
        marginBottom: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            flexDirection: 'column',
            width: '20%'
        },
    },
    listSizeButtons: {
        marginBottom: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    moreLessButtons: {
        marginTop: theme.spacing(5),
    },
}));


const LandingPage = props => {
    const classes = useStyles();
    const [imoveis, setImoveis] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(5);

    useEffect(() => {
        setIsLoading(true)
        axios.get('http://5e148887bce1d10014baea80.mockapi.io/keycash/challenge')
            .then(response => {
                const res = response.data;
                res.sort(function (a, b) {
                    return a.price - b.price;
                });
                const filteredResponse = res.filter(imovel => imovel.publish)
                setImoveis(filteredResponse)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [])


    const showHandler = (number) => {
        setShow(number)
    }

    let content = (
        <CircularProgress color="primary" />
    );

    if (!isLoading) {
        content = (
            <Container align='center'>
                <div className={classes.content}>
                    <div className={classes.sideMenu}>
                        <Typography className={classes.listSizeButtons} variant="caption" component="span">
                            Items por página
                           <Button color="primary" onClick={() => showHandler(5)}>5</Button>
                            <Button color="primary" onClick={() => showHandler(10)}>10</Button>
                            <Button color="primary" onClick={() => showHandler(15)}>15</Button>
                        </Typography>

                    </div>
                    <div className={classes.main}>
                        <ImoveisList imoveis={imoveis.slice(0, show)} />

                        <div className={classes.moreLessButtons}>
                            {show <= 5 ? null :
                                <Button
                                    color="primary"
                                    variant='outlined'
                                    disabled={show <= 5}
                                    onClick={() => showHandler(show / 2)}>
                                    <ExpandLessIcon />
                                </Button>
                            }
                            {show >= imoveis.length ? null :
                                <Button
                                    color="primary"
                                    variant='outlined'
                                    disabled={show >= imoveis.length}
                                    onClick={() => showHandler(show * 2)}>
                                    <ExpandMoreIcon />
                                </Button>
                            }
                        </div>
                    </div>
                </div>
            </Container>
        );
    }

    return (

        <>
            {content}
        </>
    );
}
export default LandingPage;