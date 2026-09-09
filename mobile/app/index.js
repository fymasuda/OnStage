// OnStage — Index (redireciona baseado em auth)
import { Redirect } from 'expo-router';
import { useAuthStore } from './src/store/authStore';

export default function Index() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Redirect href="/(app)/feed" />;
  }

  return <Redirect href="/login" />;
}
