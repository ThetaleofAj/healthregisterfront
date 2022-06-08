import React from "react";
import { useEffect,useState } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";
import Login from "./Login";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBIcon } from "mdbreact";


function EntryPage(){
   const [isLoading,setIsLoading] = useState(true)
   const [name,setName] = useState()
   const [province,setProvince] = useState()
   const [district,setDistrict] = useState()
   const [ward,setWard] = useState()
   const [coordinates,setCoordinates] = useState()
   const [infrastructure,setInfrastructure] = useState()
   const [data,setData] = useState()
   const [service,setService] = useState()
   const [equipment,setEquipment] = useState()
   const [day,setDay] = useState();
   const [hours,setHours] = useState();
   const [contact,setContact] = useState();
   let params = useParams();
   let navigate = useNavigate()
   useEffect(()=>{
      fetch(`http://barbara1.pythonanywhere.com/api/entry/${params.entryId}`,{
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


   //Edit the main model
   const EditMainModel =()=>{
      fetch(`http://barbara1.pythonanywhere.com/api/editmain/${params.entryId}`,{
         method: 'PUT',
         headers: {
            'Content-Type' : 'application/json', 
      },
      body: JSON.stringify({
         'Name':name,
         'Province':province,
         'District':district,
         'Ward':ward,
         'Coordinates':coordinates,
         'infrastructure':infrastructure
      })
      }).then(data=>data.json())
      .then(
         (result)=>{
            console.log(result)},
            window.location.reload()
      )

   }

   //Adding a Service
   const AddService =()=>{
      fetch('http://barbara1.pythonanywhere.com/api/addservices/',{
         method: 'POST',
         headers: {
            'Content-Type' : 'application/json', 
      },
      body: JSON.stringify({
         'facility':params.entryId,
         'service':service
      })
      }).then(data=>data.json())
      .then(
         (result)=>{
            console.log(result)},
            window.location.reload(),
            window.alert('Change successfully made!')
      )
   }

 //Adding new Equipment
 const AddEquipment=()=>{
   fetch('http://barbara1.pythonanywhere.com/api/addequipment/',{
      method: 'POST',
      headers: {
         'Content-Type' : 'application/json', 
   },
   body: JSON.stringify({
      'facility':params.entryId,
      'equipment':equipment,
   })
   }).then(data=>data.json())
   .then(
      (result)=>{
         console.log(result)},
         window.location.reload(),
         window.alert('Change successfully made!')
   )
 }

 //Adding new contact
 const AddContact=()=>{
   fetch('http://barbara1.pythonanywhere.com/api/addcontact/',{
      method: 'POST',
      headers: {
         'Content-Type' : 'application/json', 
   },
   body: JSON.stringify({
      'facility':params.entryId,
      'details':contact
   })
   }).then(data=>data.json())
   .then(
      (result)=>{
         console.log(result)},
         window.location.reload(),
         window.alert('Change successfully made!')
   )

 }

 //
const AddOperatingHours=()=>{
   fetch('http://barbara1.pythonanywhere.com/api/addhours/',{
      method: 'POST',
      headers: {
         'Content-Type' : 'application/json', 
   },
   body: JSON.stringify({
      'facility':params.entryId,
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

const deleteEntry =()=>{
  fetch(`http://barbara1.pythonanywhere.com/api/entry/${params.entryId}`,{
method: 'DELETE',
      })
      .then(data=>data.json())
      .then((res)=>{
        window.alert('Successfully Deleted!')
     navigate('/')
         })
}

   if(isLoading){
      return(
         <h1>Loading....</h1>
      )
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
            <p className="h4 text-center mb-4">Health facility</p>
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
              Facility name
            </label>
            <input
              type="text"
              id="defaultFormContactNameEx"
              className="form-control"
              defaultValue={data.Name}
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
              defaultValue={data.Province}
               onChange={e=>setProvince(e.target.value)}
            />
            <br />
            <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
              District
            </label>
            <input
              type="text"
              id="defaultFormContactSubjectEx"
              className="form-control"
              defaultValue={data.District}
               onChange={e=>setDistrict(e.target.value)}
            />
            <br />
            <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
              Ward
            </label>
            <input
              type="text"
              id="defaultFormContactSubjectEx"
              className="form-control"
              defaultValue={data.Ward} 
              onChange={e=>setWard(e.target.value)}
            />
            <br />
            <label htmlFor="defaultFormContactSubjectEx" className="grey-text">
              Coordinates
            </label>
            <input
              type="text"
              id="defaultFormContactSubjectEx"
              className="form-control"
              defaultValue={data.Coordinates} 
              onChange={e=>setCoordinates(e.target.value)}
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
              defaultValue={data.infrastructure} 
              onChange={e=>setInfrastructure(e.target.value)}
            />
            <div className="text-center mt-4">
              <MDBBtn color="primary" outline type="submit" onClick={EditMainModel}>
                Edit
                <MDBIcon far icon="paper-plane" className="ml-2"  />
              </MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h4 text-center mb-4"> Services</p>
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
              Service
            </label>
            {data.services.map(info=>(
          <>

<MDBContainer>
      <Link to={`/editservices/${info.id}`}>{info.service}</Link>
    </MDBContainer>
          </>

            
         ))}
            <input
              type="text"
              id="defaultFormContactNameEx"
              className="form-control"
              onChange={e=>setService(e.target.value)}
            />
           <div className="text-center mt-4">
              <MDBBtn color="primary" outline type="submit" onClick={AddService}>
                Add Service
                <MDBIcon far icon="paper-plane" className="ml-2"  />
              </MDBBtn>
            </div>
            <br />
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>



    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h4 text-center mb-4"> Equipment</p>
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
              Equipment
            </label>
            {data.equipment.map(info=>(
    <MDBContainer>
    <Link to={`/editequipment/${info.id}`}>{info.equipment}</Link>
  </MDBContainer>

         ))}
            <input
              type="text"
              id="defaultFormContactNameEx"
              className="form-control"
              onChange={e=>setEquipment(e.target.value)}
            />
           <div className="text-center mt-4">
              <MDBBtn color="primary" outline type="submit" onClick={AddEquipment}>
                Add Equipment
                <MDBIcon far icon="paper-plane" className="ml-2"  />
              </MDBBtn>
            </div>
            <br />
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>

    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h4 text-center mb-4"> Contacts</p>
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
              Contact
            </label>
            {data.contacts == null ? (<p></p>):(<>
            {data.contacts.map(info=>(
              <MDBContainer>
              <Link to={`/editcontacts/${info.id}`}>{info.details}</Link>
            </MDBContainer>
         ))}
          </>)}
            <input
              type="text"
              id="defaultFormContactNameEx"
              className="form-control"
              onChange={e=>setContact(e.target.value)}
            />
           <div className="text-center mt-4">
              <MDBBtn color="primary" outline type="submit" onClick={AddContact}>
                Add Contact
                <MDBIcon far icon="paper-plane" className="ml-2"  />
              </MDBBtn>
            </div>
            <br />
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>


    <MDBContainer>
      <MDBRow>
        <MDBCol md="6">
          <form>
            <p className="h4 text-center mb-4"> Operating Hours</p>
            {data.hours == null ? (<p></p>):(<>
            {data.hours.map(info=>(
                 <MDBContainer>
           <Link to={`/edithours/${info.id}`} ><p>{info.day} | {info.hours}</p></Link> 
           </MDBContainer>
         ))}
         </>)}
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
              Day
            </label>
            <input
              type="text"
              id="defaultFormContactNameEx"
              className="form-control"
              onChange={e=>setDay(e.target.value)}
            />
            <label htmlFor="defaultFormContactNameEx" className="grey-text">
              Hours
            </label>


            <input
              type="text"
              id="defaultFormContactNameEx"
              className="form-control"
              onChange={e=>setHours(e.target.value)}
            />
           <div className="text-center mt-4">
              <MDBBtn color="primary" outline type="submit" onClick={AddOperatingHours}>
              Add operating hours
                <MDBIcon far icon="paper-plane" className="ml-2"  />
              </MDBBtn>
            </div>
            <br />
          </form>
          <div className="text-center mt-4">
              <MDBBtn color="red" outline type="submit" onClick={deleteEntry}>
                Delete Entry
                <MDBIcon far icon="trash-alt" className="ml-2"  />
              </MDBBtn>
            </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
      </div>
   )
}
export default EntryPage;