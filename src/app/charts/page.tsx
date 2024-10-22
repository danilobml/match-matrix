'use client'

import Charts from '../components/Charts';
import WithAuth from '../components/WithAuth';

const ChartsPage = () => {
  return <Charts />;
};

export default WithAuth(ChartsPage);