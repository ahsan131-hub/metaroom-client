import React from 'react';

import Homepagecontent from '@/components/postlogin/homePage/HomePagecontent';
import Layout from '@/components/postlogin/Layouts/Layout';

const HomePage = () => {
  return (
    <Layout>
      <div className="h-screen">
        <Homepagecontent />
      </div>
    </Layout>
  );
};

export default HomePage;
