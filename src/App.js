import React from "react";
import {BrowserRouter,Route,Routes} from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import NewEntry from "./Components/NewEntry";
import Login from "./Components/Login";
import EntryPage from "./Components/EntryPage";
import EditServices from "./Components/EditMain";
import EditEquipment from "./Components/EditEquipment";
import EditContacts from "./Components/EditContacts";
import EditHours from "./Components/EditHours";
import FacilityPage from "./Components/FacilityPage";
import Logo from './resources/log_moh2.gif'
import { MDBContainer,MDBNavbar,MDBNavbarBrand} from 'mdb-react-ui-kit';




function App() {
  return (
    <div>
     <MDBNavbar light bgColor='white'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/'>
            <img
              src={Logo}
              height='60'
              alt='logo'
              loading='lazy'
            />
            Online Health Facility Register
          </MDBNavbarBrand>
        </MDBContainer>
      </MDBNavbar>
     <BrowserRouter>
     <Routes>
       <Route path='/' element={<Dashboard/>}/>
       <Route path='/newentry' element={<NewEntry/>}/>
       <Route path='/login' element={<Login/>}/>
       <Route path='/entry/:entryId' element={<EntryPage/>}/>
       <Route path='/editservices/:entryId' element={<EditServices/>}/>
       <Route path='/editequipment/:entryId' element={<EditEquipment/>}/>
       <Route path='/editcontacts/:entryId' element={<EditContacts/>}/>
       <Route path='/edithours/:entryId' element={<EditHours/>}/>
       <Route path='/facilitypage/:entryId' element={<FacilityPage/>}/>


     </Routes>
     </BrowserRouter>
   </div>
    
  );
}

export default App;
