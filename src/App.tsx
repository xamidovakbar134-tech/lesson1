
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Users from "./components/Users"
import Register from "./components/Register"
import Login from './components/Login'
import { AuthProvider } from './providers/provider'
import Chat from './components/Chat'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Users />} /> */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App

