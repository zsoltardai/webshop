import React from 'react';


const Home: React.FC = () => {
  return (
    <div>
      Kezdőlap
    </div>
  );
};

export const getServerSideProps = () => ({
  props:{},
  redirect: {
    permanent: false,
    destination: "/products",
  },
});

export default Home;
