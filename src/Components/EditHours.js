import React from "react";
import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";

function EditHours(){
   let params = useParams()
   const [data,setData] = useState()
   const [hours,setHours] = useState()
   const [day,setDay] = useState()
   const [isLoading,setIsLoading] = useState(true)

   useEffect(()=>{
      fetch(`http://barbara1.pythonanywhere.com/api/edithours/${params.entryId}`,{
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

   const Edit=()=>{
      fetch(`http://barbara1.pythonanywhere.com/api/edithours/${params.entryId}`,{
         method: 'PUT',
         headers: {
            'Content-Type' : 'application/json', 
      },
      body: JSON.stringify({
         'day':day,
         'hours':hours
      })
      }).then(data=>data.json())
      .then(
         (result)=>{
            console.log(result)},
            window.location.reload(),
            window.alert('Change successfully made!')
      )
   }

   if(isLoading){
      return(
         <h1>Loading....</h1>
      )
   }

   return(
      <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h4 text-center mb-4">Edit Operating Hours</p>
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
              Days
            </label>
            <input
              type="text"
              id="defaultFormContactNameEx"
              className="form-control"
              defaultValue={data.day}
              onChange={e=>setDay(e.target.value)}
            />
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
              Hours
            </label>
            <input
              type="text"
              id="defaultFormContactNameEx"
              className="form-control"
              defaultValue={data.hours}
              onChange={e=>setHours(e.target.value)}
            />
           <div className="text-center mt-4">
              <MDBBtn color="primary" outline type="submit" onClick={Edit}>
                Edit
                <MDBIcon far icon="paper-plane" className="ml-2"  />
              </MDBBtn>
            </div>
            <br />
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
   )

}
export default EditHours;