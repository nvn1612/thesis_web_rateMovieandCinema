import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StatisticCard = ({ title, value, color }) => (
  <div className="p-4 bg-white shadow rounded-md">
    <h2 className={`text-xl font-bold text-${color}-500`}>{title}</h2>
    <p className="text-2xl">{value}</p>
  </div>
);

export const Dashboard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalMovies, setTotalMovies] = useState(0);
  const [totalTheaters, setTotalTheaters] = useState(0);
  const [totalMovieRatings, setTotalMovieRatings] = useState(0);
  const [totalTheaterRatings, setTotalTheaterRatings] = useState(0);
  const [registrationData, setRegistrationData] = useState({
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [
      {
        label: 'Số lượng đăng ký',
        data: new Array(12).fill(0),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await axios.get('/user/total-users');
        setTotalUsers(response.data.totalUsers);
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    fetchTotalUsers();
  }, []);

  useEffect(() => {
    const fetchTotalPosts = async () => {
      try {
        const response = await axios.get('/post/total-posts');
        setTotalPosts(response.data.totalPosts);
      } catch (error) {
        console.error('Error fetching total posts:', error);
      }
    };

    fetchTotalPosts();
  }, []);

  useEffect(() => {
    const fetchTotalMovies = async () => {
      try {
        const response = await axios.get('/movie/total-movies');
        setTotalMovies(response.data.totalMovies);
      } catch (error) {
        console.error('Error fetching total movies:', error);
      }
    };

    fetchTotalMovies();
  }, []);

  useEffect(() => {
    const fetchTotalTheaters = async () => {
      try {
        const response = await axios.get('/movie-theater/total-theaters');
        setTotalTheaters(response.data.totalTheaters);
      } catch (error) {
        console.error('Error fetching total theaters:', error);
      }
    };

    fetchTotalTheaters();
  }, []);

  useEffect(() => {
    const fetchTotalMovieRatings = async () => {
      try {
        const response = await axios.get('/movie-rating/total-movie-ratings');
        setTotalMovieRatings(response.data.totalMovieRatings);
      } catch (error) {
        console.error('Error fetching total movie ratings:', error);
      }
    };

    fetchTotalMovieRatings();
  }, []);

  useEffect(() => {
    const fetchTotalTheaterRatings = async () => {
      try {
        const response = await axios.get('/theater-rating/total-theater-ratings');
        setTotalTheaterRatings(response.data.totalTheaterRatings);
      } catch (error) {
        console.error('Error fetching total theater ratings:', error);
      }
    };

    fetchTotalTheaterRatings();
  }, []);

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const response = await axios.get('/user/user-registrations-per-month');
        const monthlyData = new Array(12).fill(0);
        response.data.forEach(item => {
          monthlyData[item.month - 1] = item.count; 
        });
        setRegistrationData(prevData => ({
          ...prevData,
          datasets: [
            {
              ...prevData.datasets[0],
              data: monthlyData,
            },
          ],
        }));
      } catch (error) {
        console.error('Error fetching registration data:', error);
      }
    };

    fetchRegistrationData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 gap-4 p-4">
        <StatisticCard title="Tổng số người dùng" value={totalUsers} color="blue"/>
        <StatisticCard title="Tổng số bài đăng" value={totalPosts} color="orange"/>
        <StatisticCard title="Tổng số phim" value={totalMovies} color="green"/>
        <StatisticCard title="Tổng số rạp chiếu phim" value={totalTheaters} color="gray"/>
        <StatisticCard title="Tổng số lượt đánh giá phim" value={totalMovieRatings} color="red"/>
        <StatisticCard title="Tổng số lượt đánh giá rạp chiếu phim" value={totalTheaterRatings} color="red" />
      </div>
      <div className="p-4">
        <Bar
          data={registrationData}
          height={200}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                type: 'linear',
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </div>
  );
};
