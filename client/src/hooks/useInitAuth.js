import { useEffect } from "react";
import { useAuthStore } from "@/context/authStore";

export function useInitAuth() {
  useEffect(() => {
    const { initializeInterceptors, refresh, setIsLoading } =
      useAuthStore.getState();

    // Set up Axios interceptors
    initializeInterceptors();

    // Try to refresh if session exists
    if (localStorage.getItem("hasSession")) {
      refresh();
    } else {
      setIsLoading(false);
    }
  }, []);
}
