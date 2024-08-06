import { useContext } from "react";
import { rentContext } from "../App";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BedOutlinedIcon from '@mui/icons-material/BedOutlined';
import BathtubOutlinedIcon from '@mui/icons-material/BathtubOutlined';
import CropSquareOutlinedIcon from '@mui/icons-material/CropSquareOutlined';

function Liked() {
    const { liked, handleLiked } = useContext(rentContext);

    return (
        <>
            {liked.length === 0 ? 
                <div className="text-center">
                    <p className="text-3xl font-bold text-blue-400 my-10">No liked properties..</p>
                </div> : 
                <div className="flex flex-wrap w-5/6 mx-auto gap-5 my-5">
                    {liked.map((house, index) => {
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
                                    <hr />
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
                    })}
                </div>
            }
        </>
    );
}

export default Liked;
