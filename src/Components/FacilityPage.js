import React from "react";
import { useState ,useEffect} from "react";
import { Link,useParams } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, } from "mdbreact";


function FacilityPage(){
   let params = useParams();
   const [data,setData] = useState()
   const [isLoading,setIsLoading] = useState(true)

   useEffect(()=>{
     fetch(`https://barbara1.pythonanywhere.com/api/entry/${params.entryId}`,{
         method: 'GET',
      })
      .then(res=>res.json())
      .then(
         (result)=>{
            console.log(result)
            setData(result)
            setIsLoading(false)
         },
         (error)=>{

         }
      )
   },[params.entryId])


   if(isLoading){
      return(
         <>
        <h1>Loading....</h1>
         </>
      )
   }



   return(
     <div className="thisView">
     <MDBContainer>
     <MDBRow>
        <MDBCol md="6">
            <p className="h4 text-center mb-4">{data.Name}</p>
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
              PROVINCE
            </label>
       <p>{data.Province}</p>
       <label htmlFor="defaultFormContactNameEx" className="grey-text">
              DISTRICT
            </label>
       <p>{data.District}</p>
       <label htmlFor="defaultFormContactNameEx" className="grey-text">
              Ward
            </label>
       <p>{data.Ward}</p>
       <label htmlFor="defaultFormContactNameEx" className="grey-text">
            Coordinates
            </label>
       <p>{data.Coordinates}</p>
       <label htmlFor="defaultFormContactNameEx" className="grey-text">
            Infrastructure description
            </label>
       <p>{data.infrastructure}</p>
       <label htmlFor="defaultFormContactNameEx" className="grey-text">
            Services
            </label>
            {data.services == null ? (<p></p>):(<>
            {data.services.map(info=>(
              <p>{info.service}</p>
         ))}
          </>)}
         <p></p>
          <label htmlFor="defaultFormContactNameEx" className="grey-text">
            Equipment
            </label>
            {data.equipment == null ? (<p></p>):(<>
            {data.equipment.map(info=>(
              <p>{info.equipment}</p>
         ))}
          </>)}
          <p></p>
          <label htmlFor="defaultFormContactNameEx" className="grey-text">
            Operating Hours
            </label>
            {data.hours == null ? (<p></p>):(<>
            {data.hours.map(info=>(
              <p>{info.day} | {info.hours}</p>
         ))}
          </>)}
          <p></p>
          <label htmlFor="defaultFormContactNameEx" className="grey-text">
            Contact
            </label>
            {data.contacts == null ? (<p></p>):(<>
            {data.contacts.map(info=>(
              <p>{info.details}</p>
         ))}
          </>)}
          <p></p>
          <Link to={`/entry/${data.id}`}>Edit entry</Link>
            <br />
            
        </MDBCol>
      </MDBRow>
     </MDBContainer>
     </div>
      
   )

}

export default FacilityPage;