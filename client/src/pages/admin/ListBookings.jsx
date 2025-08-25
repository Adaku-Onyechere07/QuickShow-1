import React, { useEffect, useState } from 'react';
import { dummyBookingData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import { dateFormat } from '../../lib/dateFormat';
import BlurCircle from '../../components/BlurCircle';

const ListBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY;

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getAllBookings = async () => {
    setBookings(dummyBookingData);
    setIsLoading(false);
  };

  useEffect(() => {
    getAllBookings();
  }, []);

  return !isLoading ? (
    <>
        <div className="px-6 ml-16 md:ml-60 md:px-16 mt-10 lg:px-24 xl:px-44 py-10 max-w-6xl mx-auto">
        <Title text1='List' text2='Bookings' />
        <BlurCircle top="100px" left="400px" />
        <div className="mt-6 overflow-x-auto rounded-lg border border-primary/20 bg-primary/5">
          <table className="w-full min-w-[600px] border-collapse text-nowrap">
            <thead>
              <tr className="bg-primary/20 text-left text-white">
                <th className="p-4 font-medium text-sm">Movie Name</th>
                <th className="p-4 font-medium text-sm">Show Time</th>
                <th className="p-4 font-medium text-sm">Total Bookings</th>
                <th className="p-4 font-medium text-sm">Earnings</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light">
            <BlurCircle top='350px' left='1000px' />
              {bookings.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-primary/10 hover:bg-primary/10 transition-colors duration-200"
                >
                  <td className="p-4 font-medium text-white">{item.show.movie.title}</td>
                  <td className="p-4 text-gray-300">{dateFormat(item.show.showDateTime)}</td>
                  <td className="p-4 text-gray-300 text-center">
                    {Object.keys(item.bookedSeats).map(seat=> item.bookedSeats[seat]).join(', ')}
                  </td>
                  <td className="p-4 text-primary font-medium">
                    {currency}
                    {item.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {bookings.length === 0 && (
          <div className="mt-10 text-center py-8">
            <p className="text-gray-400 text-lg">No bookings available</p>
            <p className="text-gray-500 text-sm mt-2">Bookings will appear here once customers start booking shows</p>
          </div>
        )}
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default ListBookings;