import { useState, useContext, useEffect } from "react";
import { rentContext } from "../App";
import data from "../data";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';

function Home() {
  const { liked, handleLiked, searchQuery } = useContext(rentContext);

  // State for search inputs
  const [city, setCity] = useState('all');
  const [date, setDate] = useState('');
  const [price, setPrice] = useState('all');
  const [propertyType, setPropertyType] = useState('all');

  // State to hold filtered houses
  const [filteredHouses, setFilteredHouses] = useState(data);

  // Filter houses based on the search query
  useEffect(() => {
    const filtered = data.filter(house => house.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredHouses(filtered);
  }, [searchQuery]);

  // Handle form submission
  const handleSearch = (e) => {
    e.preventDefault();

    // Filter data based on search inputs
    const filtered = data.filter(house => {
      const matchesCity = city === 'all' || house.city.toLowerCase().includes(city.toLowerCase());
      const matchesPrice = price === 'all' || (
        house.price >= parseInt(price.split('-')[0]) && 
        house.price <= parseInt(price.split('-')[1])
      );
      const matchesPropertyType = propertyType === 'all' || house.type.toLowerCase().includes(propertyType.toLowerCase());

      return matchesCity && matchesPrice && matchesPropertyType;
    });

    // Update state with filtered houses
    setFilteredHouses(filtered);
  };

  return (
    <div>
      <form className="flex flex-col md:flex-row bg-[#F8F9FA] items-center justify-between w-5/6 mx-auto my-8 py-5 px-5 md:px-10 gap-4" onSubmit={handleSearch}>
        <div className="w-full md:w-auto">
          <p>Enter City</p>
          <input 
            type="text" 
            className='border-[0.1rem] border-[#DEE2E6] p-2 rounded-lg w-full'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="w-full md:w-auto">
          <p>Date</p>
          <input 
            type="date" 
            className='border-[0.1rem] border-[#DEE2E6] p-2 rounded-lg w-full'
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="w-full md:w-auto">
          <p>Price</p>
          <select 
            className='border-[0.1rem] border-[#DEE2E6] p-2 rounded-lg w-full'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          >
            <option value="all">All</option>
            <option value="0-500">Rs. 0 - 500</option>
            <option value="500-1000">Rs. 500 - 1000</option>
            <option value="1000-1500">Rs. 1000 - 1500</option>
            <option value="1500-2000">Rs. 1500 - 2000</option>
            <option value="2000-2500">Rs. 2000 - 2500</option>
            <option value="2500-3000">Rs. 2500 - 3000</option>
          </select>
        </div>
        <div className="w-full md:w-auto">
  <p className="text-ellipsis overflow-hidden whitespace-nowrap">Property Type</p>
  <select 
    className='border-[0.1rem] border-[#DEE2E6] p-2 rounded-lg w-full'
    value={propertyType}
    onChange={(e) => setPropertyType(e.target.value)}
  >
    <option value="all">All</option>
    <option value="house">House</option>
    <option value="pg">PG</option>
    <option value="farm-house">Farm House</option>
    <option value="villa">Villa</option>
    <option value="hotel">Hotel</option>
    <option value="oyo">Oyo</option>
  </select>
</div>

          <input 
            type="submit" 
            className='tran bg-[#0D6EFD] py-2 mt-[25px] px-4 rounded-lg cursor-pointer text-white hover:bg-[#250DFC] w-full md:w-auto'
          />
      </form>
      <div className="flex flex-wrap w-5/6 mx-auto gap-5 my-5">
        {filteredHouses.length > 0 ? (
          filteredHouses.map((house, index) => {
            const isLiked = liked.some(likedHouse => likedHouse.name === house.name);
            return (
              <div key={index} className="w-full md:w-[48%] lg:w-[30%] border-[0.1rem] border-[#D2D2D2] rounded-xl">
                <img className="rounded-t-xl w-full h-[15rem] object-cover" src={house.image} alt="" />
                <div className="flex flex-col gap-2 px-5 py-4">
                  <div className="flex justify-between items-center">
                    <p className="text-xl md:text-2xl text-[#0d6efd] font-medium">₹ {house.price}/day</p>
                    <FavoriteIcon 
                      sx={{ color: isLiked ? 'red' : '#6C757D', cursor: 'pointer' }} 
                      onClick={() => handleLiked(house)}    
                    />
                  </div>
                  <p className="text-lg md:text-2xl text-[#212529] font-medium">{house.name}</p>
                  <p className="text-[#6c757d]">{house.address}, {house.city}</p>
                  <hr className="" />
                  <div className="flex justify-between items-center text-[#6c757d]">
                    <div className="flex items-center gap-1">
                      <BedOutlinedIcon />
                      <p>{house.info.bed} Beds</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <BathtubOutlinedIcon />
                      <p>{house.info.bathrooms} Bath</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <CropSquareOutlinedIcon />
                      <p>{house.info.area}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>No houses found for the given search criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
