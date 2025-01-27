import CalendarComponent from './Component/Calendar';
import AttendancePage from './Component/Attendance';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LeaveForm from './Component/Leave';
import Sidebar from './Component/Sidebar'
import Home from './Component/Home';
import LoginForm from './Component/LoginForm';
import RegisterForm from './Component/RegisterForm';
import Footer from './Component/Footer';
import ForgotPassword from './Component/ForgotPassword'
import ProtectedRoute from './Component/ProtectedRoute'; // Import ProtectedRoute
import "./App.css"

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<><LoginForm /><Footer/></>} />
                <Route path="/register" element={<><RegisterForm /><Footer/></>} />
                <Route path="/forgotpassword" element={<><ForgotPassword /><Footer/></>} />
                <Route path="/home" element={<ProtectedRoute><Sidebar/><Home /><Footer/> </ProtectedRoute>}/>
                <Route path="/calendar"element={<ProtectedRoute><Sidebar/><CalendarComponent /><Footer/></ProtectedRoute>}/>
                <Route path="/paidleave" element={<ProtectedRoute><Sidebar/><LeaveForm /><Footer/></ProtectedRoute>}/>
                <Route path="/attendancelogs" element={ <ProtectedRoute> <Sidebar/> <AttendancePage /><Footer/></ProtectedRoute>}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
