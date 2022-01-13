import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"
import Navbar from "./components/Navbar"
import Homepage from "./pages/HomePage"
import SignInPage from './pages/SignInPage'
import CreateAccPage from './pages/CreateAccPage'
import UserPage from './pages/UserPage'
import AuthContextProvider from "./contexts/AuthContext"
import RequireAuth from "./components/RequireAuth"
import AlbumPage from "./pages/AlbumPage"
import CustomerPage from "./pages/CustomerPage"
import MsgPage from "./pages/MsgPage"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthContextProvider>
          <Navbar />
              <Routes>
                <Route path="/myPage" element={
                  <RequireAuth redirectTo="/signIn">
                    <UserPage />
                  </RequireAuth>
                }/>
                <Route path="/album/:id" element={
                  <RequireAuth redirectTo="/login">
                    <AlbumPage />
						    </RequireAuth>
					      } />
                <Route path="/" element={<Homepage />} />
                <Route path="/signIn" element={<SignInPage />} />
                <Route path="/createAcc" element={<CreateAccPage />} />
                <Route path="/customer/:uuid/:id/:userId" element={<CustomerPage />} />
                <Route path="/msgPage" element={<MsgPage />} />
              </Routes>
          </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
