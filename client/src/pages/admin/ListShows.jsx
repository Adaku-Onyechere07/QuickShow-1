import React, { useEffect, useState } from 'react'
import { dummyShowsData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';
import BlurCircle from '../../components/BlurCircle';

const ListShows = () => {

    const [shows, setShows] = useState([]);
    const [loading, setLoading] = useState(true);

    const getAllShows =async () => {
        try{
            setShows([{
                movie: dummyShowsData[0],
                showDateTime: "2025-06-30T02:30:00.000Z",
                showPrice: 59,
                occupiedSeats: {
                    A1: 'user_1',
                    B1: 'user_2',
                    C1: 'user_3'
                }
            }]);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=> {
        getAllShows();
    }, []); 

  return !loading ? (
    <>
        <div className="px-6 ml-16 md:ml-60 md:px-16 mt-10 pt-16 lg:px-24 xl:px-44 py-10 max-w-6xl mx-auto">
        <Title text1='List' text2='Shows' />
        <BlurCircle top="100px" left="400px" />
        <div className='mt-6 overflow-x-auto rounded-lg border border-primary/20 bg-primary/5'>
          <table className='w-full min-w-[600px] border-collapse text-nowrap'>
              <thead>
                  <tr className='bg-primary/20 text-left text-white'>
                      <th className='p-4 font-medium text-sm'>Movie Name</th>
                      <th className='p-4 font-medium text-sm'>Show Time</th>
                      <th className='p-4 font-medium text-sm'>Total Bookings</th>
                      <th className='p-4 font-medium text-sm'>Earnings</th>
                  </tr>
              </thead>
              <tbody className='text-sm font-light'>
                <BlurCircle top='350px' left='1000px' />
                  {shows.map((show,index)=> (
                      <tr key={index} className='border-b border-primary/10 hover:bg-primary/10 transition-colors duration-200'>
                          <td className='p-4 font-medium text-white'>{show.movie.title}</td>
                          <td className='p-4 text-gray-300'>{dateFormat(show.showDateTime)}</td>
                          <td className='p-4 text-gray-300 text-center'>{Object.keys(show.occupiedSeats).length}</td>
                          <td className='p-4 text-primary font-medium'>${Object.keys(show.occupiedSeats).length * show.showPrice}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
        </div>

        {shows.length === 0 && (
          <div className="mt-10 text-center py-8">
            <p className="text-gray-400 text-lg">No shows available</p>
            <p className="text-gray-500 text-sm mt-2">Add some shows to see them listed here</p>
          </div>
        )}
      </div>
    </>
  ) : <Loading />
}

export default ListShows