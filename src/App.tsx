import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthPage, EditPage, HomePage, ProfilePage } from "./pages/pagesIndex"
import useAuthStore from "./store/authStore"
import PostPage from "./pages/PostPage/PostPage"


function App() {
  const authUser = useAuthStore(state => state.user)
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={authUser? <HomePage/>: <Navigate to= "/auth" />}/>
      <Route path="/auth" element={!authUser ? <AuthPage/>  : <Navigate to= "/" />}/>
      <Route path="/:username" element={authUser? <ProfilePage/> : <Navigate to= "/auth" />}/>
      <Route path="/edit/:username" element= {authUser? <EditPage/> : <Navigate to= "/auth" />} />
      <Route path="/post" element={<PostPage/>} />
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
