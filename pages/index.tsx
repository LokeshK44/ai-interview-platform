import { useEffect } from 'react';
import { useRouter } from 'next/router';

const IndexPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the instructions page
    router.push('/instructions');
  }, [router]);

  return null; // Optional: Add a loading spinner if needed
};

export default IndexPage;
