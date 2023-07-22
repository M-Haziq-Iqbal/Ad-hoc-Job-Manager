import { useState, useEffect } from "react";
import { FIRESTORE_DB } from '../firebase'
import { getDocs, collection } from "firebase/firestore";

const firestoreFetch = (endpoint, query) => {
   const [data, setData] = useState([]);
   const [object, setObject] = useState([])
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null)

   const dataCollectionRef = collection(FIRESTORE_DB, endpoint)
   
   // console.log(object)

   const fetchData = async () => {
      setIsLoading(true);
      setData([]);

      try {
         const data = await getDocs(dataCollectionRef);
         const filteredData = data.docs.map((doc)=>({...doc.data(), id: doc.id }))
         const filteredObjects = filteredData.filter((obj) => obj.employer_email == query || obj.id == query)
         const filteredObjectsFinal = filteredObjects[0] //cannot access property from nested data structure e.g. object[0].id directly

         setData(filteredData);
         setObject(filteredObjectsFinal);
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
   }, []);

   const refetch = () => {
      setIsLoading(true);
      fetchData();
   }
   
   return { dataCollectionRef, data, object, isLoading, error, refetch };
}

export default firestoreFetch;


