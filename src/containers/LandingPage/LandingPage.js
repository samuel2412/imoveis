import React, { useState, useEffect } from 'react';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';


import ImoveisList from '../../components/ImoveisList/ImoveisList';
import InputSlider from '../../components/UI/InputSlider/InputSlider';

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
    filters: {
        width: '100%',
        marginBottom: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            flexDirection: 'column',
        },
    },
    input: {
        margin: theme.spacing(1),
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
                console.log(res)
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
                    <div className={classes.sideMenu}>
                        <div className={classes.filters}>
                            <div>
                                <Input
                                    className={classes.input}
                                    placeholder={'Preço mínimo'}
                                    value={minPriceValue}
                                    onChange={(event) => setMinPriceValue(event.target.value)}
                                    color="primary"
                                    margin="dense"
                                    inputProps={{
                                        min: 0,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                                <Input
                                    className={classes.input}
                                    placeholder={'Preço máximo'}
                                    value={maxPriceValue}
                                    margin="dense"
                                    onChange={(event) => setMaxPriceValue(event.target.value)}
                                    inputProps={{
                                        min: 0,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            </div>

                            <div>
                                <Input
                                    className={classes.input}
                                    placeholder={'Área mínima'}
                                    value={minAreaValue}
                                    onChange={(event) => setMinAreaValue(event.target.value)}
                                    color="primary"
                                    margin="dense"
                                    inputProps={{
                                        min: 0,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                                <Input
                                    className={classes.input}
                                    placeholder={'Área máxima'}
                                    value={maxAreaValue}
                                    margin="dense"
                                    onChange={(event) => setMaxAreaValue(event.target.value)}
                                    inputProps={{
                                        min: 0,
                                        type: 'number',
                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                                <InputSlider min={5} max={15} step={5} title={'Itens por página'} value={pageValue} setValue={setPageValue} />
                            </div>


                        </div>
                    </div>



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