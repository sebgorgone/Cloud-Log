import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginScreen from './Pages/loginScreen.jsx'
import {BrowserRouter, Routes, Route} from  'react-router-dom';
import PrivateRoute from './routes/PrivateRoute.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import HomePage from './Pages/homePage.jsx'
import RegisterPage from './Pages/RegisterPage.jsx';
import NoPage from './Pages/NoPage.jsx';
import LoadPage from './Pages/LoadPage.jsx';



createRoot(document.getElementById('root')).render(
      <BrowserRouter> 
        <AuthProvider>     
          <Routes>

            <Route index element={
              <PrivateRoute>
                <HomePage/>
              </PrivateRoute>
            } />



            <Route path="/home" element={
              <PrivateRoute>
                <HomePage/>
              </PrivateRoute>
            } />

            <Route path="/laodbuild" element={
              <PrivateRoute>
                <LoadPage />
              </PrivateRoute>
            } />


            <Route path="/register" element={
              <RegisterPage />
            } />

            <Route  path="/login" element={<LoginScreen />} />    

            <Route path="*" element={<NoPage />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>    
)
