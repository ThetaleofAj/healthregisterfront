import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import { MDBTable, MDBTableHead, MDBTableBody,MDBCol,MDBBtn ,MDBIcon } from 'mdb-react-ui-kit';



function Dashboard(){
   const [searchItem,setSearchItem] = useState('');
   const [data,setData] = useState();
   const [isLoading,setIsLoading] = useState(true)
    

   useEffect(()=>{
      fetch('https://barbara1.pythonanywhere.com/api/')
      .then(res=>res.json())
      .then(
         (result)=>{
            setData(result)
            setIsLoading(false)
            console.log(result)
         },
         (error)=>{
         }
      )
   },[]) 

   

   if(isLoading){
      return(
         <h1>Loading....</h1>
      )
   }

   const Logout =()=>{
      localStorage.removeItem('token')
      window.location.reload()
   }
   const onSubmit =()=>{
      fetch(`https://barbara1.pythonanywhere.com/api/?search=${searchItem}`)
      .then(res=>res.json())
      .then(
         (result)=>{
            setData(result)
            setIsLoading(false)
            console.log(result)
         },
         (error)=>{
         }
      )

   }

   return(
      <>
      <div className="mainBody">
      
         <div>
         <MDBCol md="6">
         <input className="form-control" type="text" placeholder="Search" aria-label="Search" onChange={e=>setSearchItem(e.target.value)} onKeyDown={onSubmit} />
       </MDBCol>
         </div>
         <div className="entryArea">
         
         <Link to='/newentry'>
         <MDBBtn color="primary" outline type="submit">
                Add entry
                <MDBIcon far icon="plus-square" className="ml-2"  />
              </MDBBtn>
         </Link>
         {localStorage.getItem('token') == null ? (<>
             <Link to='/login'>
             <MDBBtn color="primary" outline type="submit">
                Login
                <MDBIcon far icon="user-circle" className="ml-2"  />
              </MDBBtn>
             </Link>
         </>):(<MDBBtn color="primary" onClick={Logout} outline>Logout
         <MDBIcon far icon="paper-plane" className="ml-2"  />
         </MDBBtn>)}
         </div>
      
         <MDBTable hover striped>
         <MDBTableHead>
        <tr>
          <th>NAME</th>
          <th>PROVINCE</th>
          <th>DISTRICT</th>
          <th>WARD</th>
          <th>COORDINATES</th>
        </tr>
      </MDBTableHead>
         {data.map(info=>(
       
         <MDBTableBody >
           
          <tr >
          <Link to={`/facilitypage/${info.id}`}><td>{info.Name}</td> </Link>
<td>{info.Province}</td>
<td>{info.District}</td>
<td>{info.Ward}</td>
<td>{info.Coordinates}</td>
</tr>

         </MDBTableBody>
))}
</MDBTable>
      </div>
      </>
   );

}

export default Dashboard;