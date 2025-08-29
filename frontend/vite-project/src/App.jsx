import './App.css'
import { Home } from './Pages/Home';
import { Layout } from './Layouts/Layout';
import { Prediction } from './Pages/Prediction';
import { Query } from './Pages/Query';

import { createBrowserRouter, Route, RouterProvider, createRoutesFromElements } from 'react-router-dom';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route element={<Layout />}>
            <Route path='/' element={<Home />} />
            <Route path='/predict' element={<Prediction />} />
            <Route path='/query' element={<Query />} />
        </Route>
    )
);

const App = () => {
    return <RouterProvider router={router} />
}

export default App;