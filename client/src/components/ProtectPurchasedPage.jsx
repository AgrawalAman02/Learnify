import { useGetCoursePurchasedDetailsQuery } from '@/apis/courseApi';
import LoaderSpinner from '@/pages/LoaderSpinner';
import React from 'react'
import { Navigate, useParams } from 'react-router-dom'

export const ProtectPurchasedPage = ({children}) => {
  const {courseId} = useParams();

  const {data , isLoading} = useGetCoursePurchasedDetailsQuery(courseId);

  if(isLoading) return <LoaderSpinner/>

  return data?.isPurchased ? children : <Navigate to={`/courseDetails/${courseId}`} />
}
