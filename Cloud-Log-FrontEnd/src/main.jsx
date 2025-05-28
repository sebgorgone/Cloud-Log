import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LogInputWidget from './logInputWidget.jsx'
import LoginScreen from './Pages/loginScreen.jsx'
import {BrowserRouter, Routes, Route} from  'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>      
          <Routes>
            <Route index element={<LogInputWidget />} />
            <Route path="/home" element={<LogInputWidget />} />
            <Route  path="/login" element={<LoginScreen />} />         
          </Routes>
      </BrowserRouter>    
  </StrictMode>,
)
