import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';

import ImoveisList from '../../components/ImoveisList/ImoveisList';
import FilterInputs from '../../components/FilterInputs/FilterInputs';

const useStyles = makeStyles(theme => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row'
        },
    },
    main: {
        flex: 1
    },
    moreLessButtons: {
        marginTop: theme.spacing(5),
    },
}));

const LandingPage = props => {
    const classes = useStyles();
    const [imoveis, setImoveis] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [pageValue, setPageValue] = useState(5);
    const [minPriceValue, setMinPriceValue] = useState('');
    const [maxPriceValue, setMaxPriceValue] = useState('');
    const [minAreaValue, setMinAreaValue] = useState('');
    const [maxAreaValue, setMaxAreaValue] = useState('');



    useEffect(() => {
        setIsLoading(true)
        axios.get('http://5e148887bce1d10014baea80.mockapi.io/keycash/challenge')
            .then(response => {
                const res = response.data;
                res.sort(function (a, b) {
                    return a.price - b.price;
                });
             
                const filteredResponse = res.filter(imovel => imovel.publish && !(imovel.address.formattedAddress.includes('??')))
                setImoveis(filteredResponse)
                setIsLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIsLoading(false)
            })
    }, [])

    const redirectHandler = (id) => {
        props.history.push(
            {
                pathname: `/detail/${id}`,
                imovel: imoveis.find(imovel => imovel.id === id)
            }
        )
    }


    const applyFilter = (imoveis) => {
        return imoveis.filter(imovel =>
            imovel.price >= (minPriceValue === '' ? 0 : minPriceValue) &&
            imovel.price <= (maxPriceValue === '' ? imovel.price : maxPriceValue) &&
            imovel.usableArea >= (minAreaValue === '' ? 0 : minAreaValue) &&
            imovel.usableArea <= (maxAreaValue === '' ? imovel.usableArea : maxAreaValue)
        ).slice(0, pageValue)
    }

    let content = (
        <CircularProgress color="primary" />
    );

    if (!isLoading) {
        content = (
            <Container align='center'>
                <div className={classes.content}>

                    <FilterInputs
                        minPriceValue={minPriceValue}
                        setMinPriceValue={setMinPriceValue}
                        maxPriceValue={maxPriceValue}
                        setMaxPriceValue={setMaxPriceValue}
                        minAreaValue={minAreaValue}
                        setMinAreaValue={setMinAreaValue}
                        maxAreaValue={maxAreaValue}
                        setMaxAreaValue={setMaxAreaValue}
                        pageValue={pageValue}
                        setPageValue={setPageValue}
                    />



                    <div className={classes.main}>
                        <ImoveisList imoveis={applyFilter(imoveis)} redirectHandler={redirectHandler} />

                        <div className={classes.moreLessButtons}>
                            {pageValue <= 5 ? null :
                                <Button
                                    color="primary"
                                    variant='outlined'
                                    disabled={pageValue <= 5}
                                    onClick={() => setPageValue(pageValue / 2)}>
                                    <ExpandLessIcon />
                                </Button>
                            }
                            {pageValue >= imoveis.length ? null :
                                <Button
                                    color="primary"
                                    variant='outlined'
                                    disabled={pageValue >= imoveis.length}
                                    onClick={() => setPageValue(pageValue * 2)}>
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