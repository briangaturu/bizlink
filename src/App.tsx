import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'

// Pages
import Home from '@/pages/Home'
import ProductDetail from '@/pages/ProductDetail'
import Profile from '@/pages/Profile'
import Browse from '@/pages/Browse'
import Dashboard from '@/pages/Dashboard'
import { Layout } from './dashboardDesign/layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const { accessToken } = useSelector((state: RootState) => state.auth)

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="browse" element={<Browse />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="dashboard"
          element={
            accessToken ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App