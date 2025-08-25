import { ChartLineIcon, CircleDollarSignIcon, PlayCircleIcon, StarIcon, UsersIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { dummyDashboardData } from '../../assets/assets';
import Loading from '../../components/Loading';
import Title from '../../components/admin/Title';
import BlurCircle from '../../components/BlurCircle';
import { dateFormat } from '../../lib/dateFormat';

const Dashboard = () => {
  const currency = import.meta.env.VITE_CURRENCY;
  const [dashboardData, setdashboardData] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    activeShows: [],
    totalUser: 0,
  });

  const [loading, setLoading] = useState(true);

  const dashboardCards = [
    { title: 'Total Bookings', value: dashboardData.totalBookings || '0', icon: ChartLineIcon },
    { title: 'Total Revenue', value: currency + dashboardData.totalRevenue || '0', icon: CircleDollarSignIcon },
    { title: 'Active Shows', value: dashboardData.activeShows.length || '0', icon: PlayCircleIcon },
    { title: 'Total Users', value: dashboardData.totalUser || '0', icon: UsersIcon },
  ];

  const fetchDashboardData = async () => {
    setdashboardData(dummyDashboardData);
    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return !loading ? (
    <>
      <div className="px-6 ml-16 md:ml-60 md:px-16 mt-10 lg:px-24 xl:px-44 py-10">
        <Title text1="Admin" text2="Dashboard" />
        <div className="mt-6 flex gap-4 flex-wrap">
          <BlurCircle top="100px" left="300px" />
          {dashboardCards.map((card, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-3 bg-primary/10 border border-primary/20 rounded-md w-[200px] h-[100px]"
            >
              <div>
                <h1 className="text-sm text-gray-300">{card.title}</h1>
                <p className="text-xl font-medium mt-1">{card.value}</p>
              </div>
              <card.icon className="w-6 h-6 text-gray-300" />
            </div>
          ))}
        </div>

        <p className="mt-10 text-lg font-medium">Active Shows</p>
        <div className="relative flex flex-wrap gap-6 mt-4">
          <BlurCircle bottom='0' right='100px' />
          {dashboardData.activeShows.map((show) => (
            <div
              key={show._id}
              className="w-[180px] rounded-lg overflow-hidden pb-3 bg-primary/10 border border-primary/20 relative group-hover:not-hover:opacity-50 hover:-translate-y-1 transition duration-300"
            >
              <img
                src={show.movie.poster_path}
                alt={show.movie.title}
                className="h-60 w-full object-cover"
              />
              <p className="font-medium px-2 pt-2 truncate">{show.movie.title}</p>
              <div className="flex items-center justify-between px-2 mt-1">
                <p className="text-sm font-medium truncate">{currency} {show.showPrice}</p>
                <p className="flex items-center gap-1 text-sm text-gray-400">
                  <StarIcon className="w-4 h-4 text-primary fill-primary" />
                  {show.movie.vote_average.toFixed(1)}
                </p>
              </div>
              <p className="px-2 pt-2 text-sm text-gray-500">{dateFormat(show.showDateTime)}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
};

export default Dashboard;
