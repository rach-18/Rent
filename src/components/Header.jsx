import { useContext } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { rentContext } from '../App';

function Header() {
  const { searchQuery, setSearchQuery } = useContext(rentContext);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <header className='flex flex-col md:flex-row justify-between px-4 md:px-10 py-5 bg-[#F8F9FA] items-center'>
      <div className='flex flex-col md:flex-row justify-between w-full md:w-auto items-center mb-4 md:mb-0'>
        <Link to='/'><HomeIcon sx={{ fontSize: 40, color: '#0D6EFD' }} /></Link>
        <p className='text-xl lg:text-4xl text-[#6c757d] font-bold ml-2 md:mx-2'>Search properties to rent</p>
      </div>
      <div className='flex flex-col md:flex-row items-center gap-2 md:gap-5 w-full md:w-auto'>
        <input 
          type="text" 
          className='border-[0.1rem] border-[#DEE2E6] p-2 rounded-lg w-full md:w-auto' 
          placeholder='Search...'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <div className='flex gap-2 md:gap-5 w-full md:w-auto'>
          <Link to='/' className='tran border-[0.1rem] border-[#212529] py-2 px-4 rounded-lg hover:bg-[#212529] hover:text-white w-full md:w-auto text-center'>Search</Link>
          <Link
            to='/liked' 
            className='tran border-[0.1rem] border-[#212529] py-2 px-4 rounded-lg hover:bg-[#212529] hover:text-white w-full md:w-auto text-center'
          >
            Liked
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header;
