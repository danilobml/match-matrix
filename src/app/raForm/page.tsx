'use client'

import RAForm from '../components/RAForm';

import WithAuth from '../components/WithAuth';

const RAFormPage = () => {
  return <RAForm  />;
};

export default WithAuth(RAFormPage);
