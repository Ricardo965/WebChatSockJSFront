import { Typography } from "@material-tailwind/react"
import { Route, Routes } from "react-router-dom"
import { ChatLayout } from "./layout"

function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Routes>
        <Route path="/" element={<ChatLayout />} />
      </Routes>
    </div>
  )
}

export default App
