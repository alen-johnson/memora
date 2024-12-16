import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthPage, HomePage, ProfilePage } from "./pages/pagesIndex"


function App() {
  return (
    <>
    <BrowserRouter>
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/auth" element={<AuthPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
