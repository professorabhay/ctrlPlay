import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, Error } from '../views/index';
import BaseLayout from "../layouts/BaseLayout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = { <BaseLayout /> }>
          <Route path = "/" element = { <Home /> } />
          <Route path = "/error" element = { <Error /> } />
          <Route path = "*" element = { <Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
