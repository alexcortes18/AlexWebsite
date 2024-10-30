import Header from "./components/Header"
import Contents from "./components/Contents"
import { NavContextProvider } from "./store/NavContext"

import { createBrowserRouter, Router, RouterProvider } from "react-router-dom"
import RootLayout from './pages/RootLayout.jsx'
import ErrorPage from "./pages/ErrorPage"
import Home from "./pages/Home"
import CoverLetter from "./pages/CoverLetter.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children:
      [
        {
          index: true,
          element: <Home />
        },
        {path: 'coverletter',
          element: <CoverLetter/>
        }
      ]
  }
]);

function App() {
  return (
    <>
      {/* <NavContextProvider>
        <Header />
        <Contents></Contents>
      </NavContextProvider> */}

      <RouterProvider router={router}/>


    </>
  )
}

export default App
