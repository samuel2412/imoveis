import React from 'react';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import ImovelCard from '../ImovelCard/ImovelCard';


const ImoveisList = props => {
    const { imoveis,redirectHandler } = props;

    return (
        <Container maxWidth="md">
            <Grid container spacing={3}>
                {imoveis.map(imovel => (
                    <Grid item xs={12} sm={6} key={imovel.id}>
                        
                        <ImovelCard imovel={imovel} onClickHandler={redirectHandler} />

                    </Grid >
                ))}
            </Grid>
        </Container>

    );
}
export default ImoveisList;
