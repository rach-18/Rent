import { createContext, useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import Liked from './components/Liked';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

export const rentContext = createContext();

function App() {
  const [liked, setLiked] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Add search state

  function handleLiked(house) {
    // Check if the house is already liked
    const isLiked = liked.some(likedHouse => likedHouse.name === house.name);
    
    if (isLiked) {
      // Remove from liked list
      setLiked(liked.filter(likedHouse => likedHouse.name !== house.name));
    } else {
      // Add to liked list
      setLiked([...liked, house]);
    }
  }

  return (
    <BrowserRouter>
      <rentContext.Provider value={{ liked, setLiked, handleLiked, searchQuery, setSearchQuery }}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/liked' element={<Liked />}></Route>
        </Routes>
      </rentContext.Provider>
    </BrowserRouter>
  )
}

export default App;
