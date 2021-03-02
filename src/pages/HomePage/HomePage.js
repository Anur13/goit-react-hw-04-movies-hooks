import React, { Component } from 'react';
import TrendingList from '../../components/TrendingList/TrendingList';
import { useHistory, useLocation, useParams } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Trending today</h1>
      <TrendingList />
    </div>
  );
};

export default HomePage;
