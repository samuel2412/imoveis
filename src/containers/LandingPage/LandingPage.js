import React,{useState,useEffect} from 'react';
import axios from 'axios';

import CircularProgress from '@material-ui/core/CircularProgress';

import ImoveisList from '../../components/ImoveisList/ImoveisList';

const LandingPage = props => {
    const [imoveis,setImoveis] = useState([])
    const [isLoading,setIsLoading] = useState(false);

    useEffect(()=>{
        setIsLoading(true)
        axios.get('http://5e148887bce1d10014baea80.mockapi.io/keycash/challenge')
        .then(response=>{
            setImoveis(response.data)
            setIsLoading(false)
        })
        .catch(err=>{
            console.log(err)
            setIsLoading(false)
        })
    },[])


    let content = (
        <CircularProgress color="primary" />
    );

    if(!isLoading){
        content = (
            <ImoveisList imoveis={imoveis.filter(imovel=> imovel.publish )} />
        );
    }

    return (
        <>
           {content}
        </>
    );
}
export default LandingPage;