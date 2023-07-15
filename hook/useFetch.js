import { useState, useEffect } from "react";
import axios from "axios";
// import { RAPID_API_KEY } from '@env';

// const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)
    const [pageNum, setPageNum] = useState(1);

    const fetchData = async () => {
        setIsLoading(true);
        setData([]);

        try {

            const options = {
                method: 'GET',
                url: `https://jsearch.p.rapidapi.com/${endpoint}`,
                params: { ...query },
                headers: {
                  'X-RapidAPI-Key': '32f553a482msh31d213ac39b7999p1b28f1jsn7828b0d7ac02',
                  'X-RapidAPI-Host': 'jsearch.p.rapidapi.com',
                }
            };

            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false)
        }catch (error){
            setError(error);
            alert('There is an error')
        }finally{
            setIsLoading(false)
        }
    }

    const handlePagination = (direction) => {
        if (direction === 'left' && pageNum > 1){
            setPageNum(pageNum - 1)
            fetchData()
        } else if (direction === 'right') {
            setPageNum(pageNum + 1)
            fetchData()
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }
    
    return { data, isLoading, error, refetch, pageNum, handlePagination };
}

export default useFetch;


