import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
});

function valuetext(value) {
    return `${value}`;
}

const InputSlider = props => {
    const classes = useStyles();
    const { value, setValue,min,max,step } = props;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Typography id="range-slider" color='textSecondary'>
                {props.title}
            </Typography>
           
                <Slider
                    value={value}
                    min={min || 0}
                    step={step || 1}
                    max={max || 1000}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />
            
        </div>
    );
}
export default InputSlider;
