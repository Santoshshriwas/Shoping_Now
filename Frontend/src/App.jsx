import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import Footer from './Components/Footer';
import Home from './Pages/Home';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/home" element={<Home />}/>


        </Route>
        {/* <Footer/> */}
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;
