import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles(theme => ({
    root: {
        width: 250,
    },
    input: {
        margin: theme.spacing(1),
        width: 90,
    }
}));

const InputSlider = props => {
    const classes = useStyles();
    const { value, setValue } = props;


    


    return (
        <div className={classes.root} noValidate autoComplete="off">

            <div  >
                <Input
                    placeholder='min'
                    className={classes.input}
                    value={value[0]}
                    margin="dense"
                    onChange={props.handleInputChange}
                    inputProps={{
                        min: 0,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />


                <Input
                    placeholder='max'
                    className={classes.input}
                    value={value[1]}
                    margin="dense"
                    onChange={props.handleInputChange}
                    inputProps={{
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                    }}
                />
            </div>
        </div>
    );
}
export default InputSlider;