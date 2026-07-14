import { Suspense } from 'react';
import AppRoutes from './routes/AppRoutes';
import LoadingState from './components/common/LoadingState';

function App() {
  return (
    <Suspense fallback={<LoadingState title="Loading experience" description="Preparing the application shell..." />}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;
