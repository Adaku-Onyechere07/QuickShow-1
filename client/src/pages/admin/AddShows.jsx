import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { CheckIcon, DeleteIcon, StarIcon } from 'lucide-react';
import BlurCircle from '../../components/BlurCircle';

const AddShows = () => {

    const currency = import.meta.env.VITE_CURRENCY;
    
    const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [dateTimeSelection, setdateTimeSelection] = useState({});
    const [dateTimeInput, setdateTimeInput] = useState("");
    const [showPrice, setshowPrice] = useState("");

    const fetchNowPlayingMovies = async () => {
        setNowPlayingMovies(dummyShowsData);
      };

    const handleDateTimeAdd = () => {
        if (!dateTimeInput) return;
        const [date, time] = dateTimeInput.split("T");
        if(!date || !time) return;

        setdateTimeSelection((prev) => {
            const times = prev[date] || [];
            if(!times.includes(time)) {
                return {...prev, [date]: [...times, time]};
            }
            return prev;
        });
    };

    const handleRemoveTime = (date,time) => {
        setdateTimeSelection((prev) =>{
            const filteredTimes = prev[date].filter((t) => t !== time);
            if (filteredTimes.length === 0) {
                const {[date]: _, ...rest} = prev;
                return rest;
            }
            return {
                ...prev,
                [date]: filteredTimes,
            };
        });
    };

    useEffect(()=> {
        fetchNowPlayingMovies()
    }, []);

  return nowPlayingMovies.length > 0 ? (
    <>
        <div className="px-6 ml-16 md:ml-60 md:px-16 mt-10 lg:px-24 xl:px-44 py-10 overflow-x-hidden">
        <Title text1='Add' text2='Shows' />
        <BlurCircle top="100px" left="400px" />
        <p className='mt-10 mb-4 text-lg font-medium'>Now Playing Movies</p>
        
        <div className='mt-6 flex gap-6 overflow-x-auto scrollbar-hide py-2'>
        <BlurCircle bottom='0' right='0' />
          <div className='relative flex flex-wrap gap-6 mt-6 relative group-hover:not-hover:opacity-50 hover: -translate-y-1 duration-300 transition'>
            {nowPlayingMovies.map((movie) => (
                <div key={movie.id} onClick={()=> setSelectedMovie(movie.id)} className={`w-[180px] rounded-lg overflow-hidden pb-3 mt-2 bg-primary/10 border border-primary/20 relative group-hover:not-hover:opacity-50 hover:-translate-y-1 transition duration-300`}>
                    <div className='relative rounded-lg overflow-hidden'>
                        <img src={movie.poster_path} alt='' className="h-60 w-full object-cover" />
                        <p className="font-medium px-2 pt-2 truncate">{movie.title}</p>
                    
                        <div className="flex items-center justify-between px-2 mt-1">
                            <p className="text-sm font-medium truncate">{new Date(movie.release_date).getFullYear()}</p>
                            <p className="flex items-center gap-1 text-sm text-gray-400">
                            <StarIcon className="w-4 h-4 text-primary fill-primary" />
                            {movie.vote_average.toFixed(1)}
                            </p>
                            <p className="px-2 pt-2 text-sm text-gray-500">
                            {(movie.vote_count / 1000).toFixed(0)}k Votes
                            </p>
                        </div>                    
                    </div>
                    {selectedMovie === movie.id && (
                        <div className='absolute top-2 right-2 flex items-center justify-center bg-primary h-6 w-6 rounded'>
                            <CheckIcon className='w-4 h-4 text-white' strokeWidth={2.5} />
                        </div>
                    )} 
                                       
                </div>
            ))}
          </div>
        </div>
        <div className='mt-8'>
            <label className='block text-sm font-medium mb-2'>Show Price</label>
            <div className='inline-flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-md'>
                <p className='text-gray-400 text-sm'>{currency}</p>
                <input min={0} type="number" value={showPrice} onChange={(e) => setshowPrice(e.target.value)} placeholder='Enter show Price' className='outline-none' />
            </div>

        </div>

        <div className='mt-6'>
            <label className='block text-sm font-medium mb-2'>Select Date and Time</label>
            <div className='inline-flex gap-5 border border-gray-600 p-1 pl-3 rounded-lg'>
                <input type="datetime-local" value={dateTimeInput} onChange={(e) => setdateTimeInput(e.target.value)} className='outline-none rounded-md' />
                <button onClick={handleDateTimeAdd} className='bg-primary text-white px-3 py-2 text-sm rounded-lg hover:bg-primary/80 cursor-pointer'>Add Time</button>
            </div>
        </div>

        {Object.keys(dateTimeSelection).length > 0 && (
            <div className='mt-6'>
            <h2 className='mb-2'>Selected Date-Time</h2>
            <ul className='space-y-3'>
                {Object.entries(dateTimeSelection).map(([date, times]) => (
                    <li key={date}>
                        <div className='font-medium'>{date}</div>
                        <div className='flex flex-wrap gap-2 mt-1 text-sm'>
                            {times.map((time) => (
                                <div key={time} className='border border-primary px-2 py-1 flex items-center rounded'>
                                    <span>{time}</span>
                                    <DeleteIcon onClick={()=> handleRemoveTime(date, time)} width={15} className='ml-2 text-red-500 hover:text-red-700 cursor-pointer' />
                                </div>
                            ))}
                        </div>
                    </li>
                ))}
            </ul>
            </div>
        )}
        <button className='bg-primary text-white px-8 py-2 mt-6 rounded hover:bg-primary/90 transition-all'>Add Show</button>
      </div>
    </>
  ) : <Loading />
}

export default AddShows