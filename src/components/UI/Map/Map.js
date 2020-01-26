import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';

import { makeStyles } from '@material-ui/core/styles';
import RoomIcon from '@material-ui/icons/Room';



const useStyles = makeStyles(theme => ({
    root: {
        height: '300px',
        width: '100%',
        padding: theme.spacing(1)
    }
}));


const Map = props => {
    const classes = useStyles();
    const [center, setCenter] = useState({ lat: props.lat, lng: props.lng });
    const [zoom, setZoom] = useState(14);

    return (
        <div className={classes.root}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAsIAZu-uzbE_CBxU4Xr0xzal9tJG7BHXc' }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                <RoomIcon
                    lat={props.lat}
                    lng={props.lng}
                    text="My Marker"
                    color="primary"
                />


            </GoogleMapReact>
        </div>
    );
}

export default Map;