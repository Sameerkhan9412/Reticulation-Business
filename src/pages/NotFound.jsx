import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found - Reticulation</title>
        <meta name="description" content="The page you are looking for does not exist." />
      </Helmet>
      <div className="text-center py-20">
        <h1 className="text-9xl font-extrabold text-purple-400">404</h1>
        <p className="text-2xl md:text-3xl font-semibold text-white mt-4">Page Not Found</p>
        <p className="text-gray-400 mt-2 mb-8">Sorry, the page you are looking for could not be found.</p>
        <Button asChild>
          <Link to="/">Go back to Home</Link>
        </Button>
      </div>
    </>
  );
};

export default NotFound;