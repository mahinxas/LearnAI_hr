import { useEffect, useState } from 'react';

export const FEATURE_FLAGS = {
  aiApi: import.meta.env.VITE_ENABLE_AI_FEATURES === 'true',
};

export function useOnlineStatus() {
  const [online, setOnline] = useState(() => {
    if (typeof navigator === 'undefined') {
      return true;
    }

    return navigator.onLine;
  });

  useEffect(() => {
    const updateOnlineStatus = () => setOnline(navigator.onLine);

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return online;
}

export function getRuntimeCapabilities(online) {
  return {
    offlineContent: true,
    localPromptBuilder: true,
    aiApi: FEATURE_FLAGS.aiApi && online,
  };
}

export function isFeatureAvailable(feature, online = navigator.onLine) {
  return Boolean(getRuntimeCapabilities(online)[feature]);
}

