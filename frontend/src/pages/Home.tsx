import AdminBanner from '../components/landing/AdminBanner';
import NotAuthedBanner from '../components/landing/NotAuthedBanner';
import UserBanner from '../components/landing/UserBanner';
import { useAuthSelector } from '../store';

const Home = () => {
  const auth = useAuthSelector();
  const user = auth.user;
 
  if (!user) {
    return (
      <NotAuthedBanner />
    );
  }

  if (auth.user?.admin) {
    return (
      <AdminBanner />
    );
  } else {
    return (
      <UserBanner />
    );
  }
}

export default Home;