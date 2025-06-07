import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LogInputWidget from './logInputWidget.jsx'
import LoginScreen from './Pages/loginScreen.jsx'
import {BrowserRouter, Routes, Route} from  'react-router-dom';
import PrivateRoute from './routes/PrivateRoute.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import HomePage from './pages/homePage.jsx'



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter> 
        <AuthProvider>     
          <Routes>

            <Route index element={<PrivateRoute>
              <HomePage />
              </PrivateRoute>
            } />

            <Route path="/home" element={
              <PrivateRoute>
              <HomePage />
              </PrivateRoute>
            } />

              <Route path="/widgetbuild" element={
              <PrivateRoute>
              <LogInputWidget />
              </PrivateRoute>
            } />

            <Route  path="/login" element={<LoginScreen />} />         
          </Routes>
        </AuthProvider>
      </BrowserRouter>    
  </StrictMode>,
)
