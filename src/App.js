import axios from "axios";
import DashboardPage from './pages/dashboard/dashboard';
import StudentEnrollmentR from './pages/R_studentEnrollment/r_studentEnrollment';
import EnrolledStudentR from "./pages/R_studentEnrollment/r_enrolledStudent"
import ManageRecordR from './pages/R_manageRecord/r_manageRecord';
import ClassRecordR from './pages/R_manageRecord/r_classRecord';
import SourceListR from "./pages/R_manageRecord/r_sourceList"
import InstructRecordR from './pages/R_instructorRecord/r_instructorRecord';
import ClearanceAdminR from './pages/R_clearanceAdmin/r_cleranceAdmin';
import RecordS from './pages/S_record/s_record';
import EnrollmentS from './pages/S_enrollment/s_enrollment';
import PreRegistrationForm from "./pages/S_enrollment/s_preregistratioForm"
import MyClassI from './pages/I_myclass/i_myclass';
import StudentRecordC from './pages/C_studentRecord/c_studentrecord';
import Login from "./pages/login/login"
import UserProfile from "./pages/profile/userProfile"


import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {
  axios.defaults.withCredentials = true;
  return(
    <Router>
      <div className='app'> 
        <Routes>
          <Route path="/" element={<Login/>}> </Route>
          <Route path='/dashboard/' element={ <DashboardPage/> }></Route>
          <Route path='/student-enrollment/' element={ <StudentEnrollmentR/> }></Route>
          <Route path='/enrolled-student/' element={ <EnrolledStudentR/> }></Route>
          <Route path='/manage-record/' element={ <ManageRecordR/> }></Route>
          <Route path='/class-record/' element={ <ClassRecordR/> }></Route>
          <Route path='/source-list/' element={ <SourceListR/> }></Route>
          <Route path='/instructor-record/' element={ <InstructRecordR/> }></Route>
          <Route path='/clearance-admin/' element={ <ClearanceAdminR/> }></Route>
          <Route path='/record/' element={ <RecordS/> }></Route>
          <Route path='/enrollment/' element={ <EnrollmentS/> }></Route>
          <Route path='/pre-register/' element={ <PreRegistrationForm/> }></Route>
          <Route path='/myclass/' element={ <MyClassI/> }></Route>
          <Route path='/student-record/' element={ <StudentRecordC/> }></Route>
          <Route path='/profile/' element={ <UserProfile/> }></Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
