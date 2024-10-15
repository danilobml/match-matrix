'use client'

import RAForm from '../components/RAForm';

import WithAuth from '../components/WithAuth';

const FormPage = ({ searchParams }: { searchParams: { mode: string } }) => {
  const mode = searchParams?.mode || 'add';
  return <RAForm mode={mode as 'add' | 'update'} />;
};

export default WithAuth(FormPage);
