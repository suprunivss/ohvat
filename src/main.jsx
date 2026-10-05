import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import HomePage from './pages/HomePage.jsx'
import CatalogPage from './pages/CatalogPage.jsx'
import PlaceDetailPage from './pages/PlaceDetailPage.jsx'
import CalculatorPage from './pages/CalculatorPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="catalog/place/:id" element={<PlaceDetailPage />} />
          <Route path="calculator" element={<CalculatorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
