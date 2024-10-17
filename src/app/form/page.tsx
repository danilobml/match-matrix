'use client'

import RAForm from '../components/RAForm';

import WithAuth from '../components/WithAuth';

const FormPage = () => {
  return <RAForm  />;
};

export default WithAuth(FormPage);
