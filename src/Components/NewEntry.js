import React from "react";
import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";

function NewEntry(){
   const [isLoading,setIsLoading] = useState(true)
   const [Name,setName] = useState();
   const [Province,setProvince] = useState();
   const [Ward,setWard] = useState();
   const [Coordinates,setCoordinates] = useState();
   const [District,setDistrict] = useState();
   const [infrastructure,setInfrastructure] = useState();

   let navigate = useNavigate();

   useEffect(()=>{
      setIsLoading(false)
      fetch('http://barbara1.pythonanywhere.com/api/create/',{
         method: 'GET',
         headers: {
          //  'Authorization': 'token ' + token
         }
      })
      .then(res=>res.json())
      .then(
         (result)=>{
            setIsLoading(false)
            console.log(result)
          //  if(result.status_code == 401){
            //   navigate('/login')
            //}
         },
         (error)=>{
            //console.log(error)
          //  navigate('/login')

         }
      )

   },[])

   const createEntry=(components)=>{
      fetch('http://barbara1.pythonanywhere.com/api/create/',{
         method: 'POST',
         headers: {
          //  'Authorization': 'token ' + token,
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(
             components
         )
      })
      .then(data=>data.json())
      .then(
         (result)=>{
            navigate(`/entry/${result.id}`)
            console.log(result)
            window.alert('Entry created successfully!')
         }
      )
   }
   
   
   if(isLoading){
      return(
         <h1>Loading....</h1>
      )
   }
 

   const handleSubmit=e=>{
      e.preventDefault();
      const token = createEntry({
         Name,
        Province,
        District,
          Ward,
          Coordinates,
          infrastructure,
          
      })
      console.log(token)
   }


   if(localStorage.getItem('token') == null){
      return(
         <Login/>
      )
   }



   return(
      <div className="thisView">
      <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h4 text-center mb-4">Register a new health facility</p>
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
              Facility name
            </label>
            <input
              type="text"
              id="defaultFormContactNameEx"
              className="form-control"
              onChange={e=>setName(e.target.value)}

            />
            <br />
            <label htmlFor="defaultFormContactEmailEx" className="grey-text">
              Province
            </label>
            <input
              type="email"
              id="defaultFormContactEmailEx"
              className="form-control"
              onChange={e => setProvince(e.target.value)}
            />
            <br />
            <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
              District
            </label>
            <input
              type="text"
              id="defaultFormContactSubjectEx"
              className="form-control"
              onChange={e => setDistrict(e.target.value)}
            />
            <br />
            <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
              Ward
            </label>
            <input
              type="text"
              id="defaultFormContactSubjectEx"
              className="form-control"
              onChange={e => setWard(e.target.value)}
            />
            <br />
            <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
              Coordinates
            </label>
            <input
              type="text"
              id="defaultFormContactSubjectEx"
              className="form-control"
              onChange={e => setCoordinates(e.target.value)}
            />
            <br />
            <label htmlFor="defaultFormContactMessageEx" className="grey-text">
              Infrastructure description
            </label>
            <textarea
              type="text"
              id="defaultFormContactMessageEx"
              className="form-control"
              rows="3"
              onChange={e => setInfrastructure(e.target.value)}
            />
            <div className="text-center mt-4">
              <MDBBtn color="primary" outline type="submit" onClick={handleSubmit}>
                Register
                <MDBIcon far icon="paper-plane" className="ml-2"  />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    
      </div>
   )
}
export default NewEntry;