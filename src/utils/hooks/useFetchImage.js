
import React, { useState, useEffect } from 'react'
import axios from 'axios';

const url = process.env.REACT_APP_UNSPLASH_URL;
const apiKey = process.env.REACT_APP_UNSPLASH;

export default function useFetchImage(page, searchTerm) {

    const [images, setImages] = useState([])
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    function fetchSearch() {
        axios.get( `${url}search/photos/?client_id=${apiKey}&page=${page}&query=${searchTerm}`).then((response) => {

            setImages([...response.data.results]);
        
        setIsLoading(false)
    }).catch((e) => {
        //setErrors(e.response.data.errors);
        setErrors(["Unable to fetch images"])
        setIsLoading(false)
    }) 
    }

    function fetchRandom() {
        axios.get( `${url}/photos/?client_id=${apiKey}&page=${page}`).then((response) => {

            setImages([...images, ...response.data]);

            setIsLoading(false)
        }).catch((e) => {
            //setErrors(e.response.data.errors);
            setErrors(["Unable to fetch images"])
            setIsLoading(false)
        })
        
    }

    useEffect(() => {
        setIsLoading(true)
        if(searchTerm !== null){
            fetchSearch();
        }

        else {
            fetchRandom();
        }


         
    }, [page])

    useEffect(() => {

        if(searchTerm === null) return ;

        fetchSearch();
        
    }, [searchTerm])

    return [images, setImages, errors, isLoading]
}
