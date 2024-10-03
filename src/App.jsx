import Header from "./components/Header"
import Contents from "./components/Contents"
import { NavContextProvider } from "./store/NavContext"


function App() {

  return (
    <>
      <NavContextProvider>
        <Header />
        <Contents></Contents>
      </NavContextProvider>
    </>
  )
}

export default App
