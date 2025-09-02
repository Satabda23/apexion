// src/admin/hooks/useLocalStorage.js
import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Remove item from localStorage
  const removeValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, removeValue];
};

// Hook for admin preferences
export const useAdminPreferences = () => {
  const [preferences, setPreferences, removePreferences] = useLocalStorage(
    "adminPreferences",
    {
      sidebarCollapsed: false,
      theme: "light",
      language: "en",
      itemsPerPage: 10,
      notificationsEnabled: true,
      autoRefresh: true,
      refreshInterval: 30000, // 30 seconds
    }
  );

  const updatePreference = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return {
    preferences,
    updatePreference,
    removePreferences,
  };
};

// Hook for admin session data
export const useAdminSession = () => {
  const [sessionData, setSessionData, removeSessionData] = useLocalStorage(
    "adminSession",
    {
      lastLoginTime: null,
      currentPage: "dashboard",
      searchHistory: [],
      recentActions: [],
    }
  );

  const updateLastLogin = () => {
    setSessionData((prev) => ({
      ...prev,
      lastLoginTime: new Date().toISOString(),
    }));
  };

  const updateCurrentPage = (page) => {
    setSessionData((prev) => ({ ...prev, currentPage: page }));
  };

  const addToSearchHistory = (searchTerm) => {
    setSessionData((prev) => ({
      ...prev,
      searchHistory: [
        searchTerm,
        ...prev.searchHistory.filter((term) => term !== searchTerm).slice(0, 9), // Keep last 10 unique searches
      ],
    }));
  };

  const addToRecentActions = (action) => {
    const actionWithTimestamp = {
      ...action,
      timestamp: new Date().toISOString(),
    };

    setSessionData((prev) => ({
      ...prev,
      recentActions: [
        actionWithTimestamp,
        ...prev.recentActions.slice(0, 19), // Keep last 20 actions
      ],
    }));
  };

  const clearSessionData = () => {
    removeSessionData();
  };

  return {
    sessionData,
    updateLastLogin,
    updateCurrentPage,
    addToSearchHistory,
    addToRecentActions,
    clearSessionData,
  };
};

// Hook for form data persistence
export const useFormPersistence = (formName, initialData = {}) => {
  const [formData, setFormData, removeFormData] = useLocalStorage(
    `form_${formName}`,
    initialData
  );

  const updateFormData = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const clearFormData = () => {
    removeFormData();
  };

  // Auto-save form data every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Only auto-save if form has data
      if (Object.keys(formData).length > 0) {
        console.log(`Auto-saved form: ${formName}`);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [formData, formName]);

  return {
    formData,
    updateFormData,
    clearFormData,
  };
};

export default useLocalStorage;
