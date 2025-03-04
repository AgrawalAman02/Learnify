import { useGetCoursePurchasedDetailsQuery } from '@/apis/courseApi';
import LoaderSpinner from '@/pages/LoaderSpinner';
import React, { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'

export const ProtectPurchasedPage = ({children}) => {
  const {courseId} = useParams();

  const {data , isLoading,refetch} = useGetCoursePurchasedDetailsQuery(courseId);

  useEffect(() => {
    refetch();
  }, [refetch]);


  if(isLoading) return <LoaderSpinner/>

  const isPendingPayment = window.location.pathname.includes('/success/video');

  return (data?.isPurchased || isPendingPayment) ? 
  children : 
  <Navigate to={`/courseDetails/${courseId}`} />;
}
