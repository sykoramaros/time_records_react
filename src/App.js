import React from "react"
import { HashRouter, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
      </Routes>
    </HashRouter>
  )
}

export default App