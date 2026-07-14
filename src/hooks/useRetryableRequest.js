import { useCallback, useState } from 'react';

export const useRetryableRequest = (requestFn) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const execute = useCallback(async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const result = await requestFn(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
      setAttempt((current) => current + 1);
    }
  }, [requestFn]);

  const retry = useCallback(async (...args) => {
    return execute(...args);
  }, [execute]);

  return { data, error, loading, attempt, execute, retry };
};
