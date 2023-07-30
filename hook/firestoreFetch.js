import { useState, useEffect } from "react";
import { FIRESTORE_DB } from '../firebase'
import { getDocs, collection } from "firebase/firestore";

const firestoreFetch = (endpoint, query) => {
   const [data, setData] = useState([]);
   const [object, setObject] = useState([])
   const [objectArray, setObjectArray] = useState([])
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null)

   const dataCollectionRef = collection(FIRESTORE_DB, endpoint)

   // console.log(query)

   const fetchData = async () => {
      setIsLoading(true);
      setData([]);

      try {
         const snapshot = await getDocs(dataCollectionRef);
         const filteredData = snapshot?.docs.map((doc)=>({...doc.data(), id: doc.id }))
         setData(filteredData);
         
         const filteredObject = filteredData?.filter((obj) => obj?.employer_email === query || obj?.worker_email === query || obj?.id === query)
         setObjectArray(filteredObject);

         const extractObject = filteredObject[0] //cannot access property from nested data structure e.g. object[0].id directly
         setObject(extractObject);
         
         setIsLoading(false)
         
      }catch (error){
         setError(error);
         alert('There is an error')
      }finally{
         setIsLoading(false)
      }
   }

   useEffect(() => {
      fetchData();
   }, [query]);

   const refetch = () => {
      setIsLoading(true);
      fetchData();
   }
   
   return { dataCollectionRef, data, object, objectArray, isLoading, error, refetch };
}

export default firestoreFetch;


