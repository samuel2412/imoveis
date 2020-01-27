import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputSlider from '../UI/InputSlider/InputSlider';


const useStyles = makeStyles(theme => ({
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
}));

const FilterInputs = props => {
    const classes = useStyles();
    const {minPriceValue,setMinPriceValue,
        maxPriceValue, setMaxPriceValue,
        minAreaValue,setMinAreaValue,
        maxAreaValue, setMaxAreaValue,
        pageValue, setPageValue
    } = props


    return (
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

    );
}
export default FilterInputs;