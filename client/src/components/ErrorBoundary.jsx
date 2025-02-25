import React from 'react';
import { useRouteError, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

const ErrorBoundary = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Oops!</h1>
        <p className="mb-4">
          {error?.status === 404 
            ? "The page you're looking for doesn't exist." 
            : "Something went wrong."}
        </p>
        <Button
          onClick={() => navigate('/')}
          className="bg-indigo-600 hover:bg-indigo-700"
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default ErrorBoundary;