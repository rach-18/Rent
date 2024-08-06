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
    <header className='flex justify-between px-10 py-5 bg-[#F8F9FA] items-center'>
      <Link to='/'><HomeIcon sx={{fontSize: 40, color: '#0D6EFD'}} /></Link>
      <p className='text-4xl text-[#6c757d] font-bold'>Search properties to rent</p>
      <div className='flex items-center gap-5'>
        <input 
          type="text" 
          className='border-[0.1rem] border-[#DEE2E6] p-2 rounded-lg' 
          placeholder='Search...'
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Link to='/' className='tran border-[0.1rem] border-[#212529] py-2 px-4 rounded-lg hover:bg-[#212529] hover:text-white'>Search</Link>
        <Link
          to='/liked' 
          className='tran border-[0.1rem] border-[#212529] py-2 px-4 rounded-lg hover:bg-[#212529] hover:text-white'
        >
          Liked
        </Link>
      </div>
    </header>
  )
}

export default Header;
