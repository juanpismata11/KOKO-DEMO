import { BrowserRouter, Routes, Route } from 'react-router'
import LandingPage from './components/landing/LandingPage'
import Registro from './pages/Registro/Registro'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/registro" element={<Registro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
