import { Route, Routes } from "react-router"
import LoginPage from "./pages/LoginPage"
import ResetPasswordPage from "./pages/ResetPasswordPage"
import AtletPage from "./pages/AtletPage"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/student" element={<AtletPage />}></Route>
      </Routes>
    </>
  )
}

export default App
