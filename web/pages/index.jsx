import dynamic from 'next/dynamic';

import About from '../components/Home/About';
import Go from '../components/Home/Go';
import Hero from '../components/Home/Hero';
import Padding from '../components/Home/Padding';
import Services from '../components/Home/Services';
import Layout from '../components/Layout';

const CreatorsSection = dynamic(() => import('../components/Home/CreatorsSection'));

const Home = () => {
  return (
    <Layout title={['Home']}>
      <Hero />
      <Padding
        title="Here for you!"
        text="To maximize your productivity"
        bgDark="green.300"
        bgLight="green.500"
      />
      <About />
      <Padding
        title="About us?"
        text="We are Liyue Workspaces. A large-scale building in the heart of 東京, 日本 !"
        bgDark="blue.300"
        bgLight="blue.500"
      />
      <Services />
      <Padding
        title="Want to try?"
        text="Register an account and go ahead!"
        bgDark="red.300"
        bgLight="red.500"
      />
      <Go />
      <CreatorsSection />
    </Layout>
  );
};

export default Home;
