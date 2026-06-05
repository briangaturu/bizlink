import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from '@/app/store'


// Pages
import Home from '@/pages/Home'
import ProductDetail from '@/pages/ProductDetail'
import Profile from '@/pages/Profile'

// import AdminDashboard from '@/pages/admin/Dashboard'
// import AdminUsers from '@/pages/admin/Users'
// import AdminListings from '@/pages/admin/Listings'
// import AdminReports from '@/pages/admin/Reports'
// import AdminCategories from '@/pages/admin/Categories'
// import AdminMessages from '@/pages/admin/Messages'
// import AdminSettings from '@/pages/admin/Settings'
import Browse from '@/pages/Browse'
import { Layout } from './dashboardDesign/layout'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  const { token, userRole } = useAuthStore()

  return (
    <Routes>
      {/* PUBLIC USER ROUTES */}
      <Route path="/" element={<Layout />}>
  <Route index element={<Home />} />
  <Route path="browse" element={<Browse />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />


        <Route path="login" element={<Login />} />
<Route path="register" element={<Register />} />

        {/* PROTECTED USER ROUTES */}
       

        <Route
          path="profile"
          element={
            token ? <Profile /> : <Navigate to="/auth/login" replace />
          }
        />
      </Route>


      {/* ADMIN ROUTES */}
      {/* <Route
        path="/admin/*"
        element={
          token && userRole === 'admin'
            ? <AdminLayout />
            : <Navigate to="/admin/login" replace />
        }
      > */}
        {/* <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="listings" element={<AdminListings />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route> */}

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App