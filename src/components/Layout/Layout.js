import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        width: '80vw',
        margin: 'auto',
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    },
    gridList: {
    },
}));

const Layout = props => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {props.children}
        </div>
    );
}
export default Layout;