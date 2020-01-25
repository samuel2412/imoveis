import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ImovelCard from '../ImovelCard/ImovelCard';


const ImoveisList = props => {
    const { imoveis } = props;

    console.log(props.imoveis)
    return (
        <Container maxWidth="md">
            <Grid container spacing={3}>
                {imoveis.map(imovel => (
                    <Grid item xs={12} sm={12} md={12} key={imovel.id}>
                        
                        <ImovelCard imovel={imovel} />

                    </Grid >
                ))}
            </Grid>
        </Container>

    );
}
export default ImoveisList;
