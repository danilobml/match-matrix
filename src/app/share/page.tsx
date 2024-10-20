'use client'

import Share from '../components/Share';
import WithAuth from '../components/WithAuth';

const SharePage = () => {
  return <Share />;
};

export default WithAuth(SharePage);
