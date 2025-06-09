import { useMutation } from "@tanstack/react-query";
import api from "@/services/api/api";
import { useAuthStore } from "@/context/authStore";
import toast from "react-hot-toast";

export const useUpdateUserBudget = (setOpenInput) => {
  return useMutation({
    // step 1: called before the request is sent
    onMutate: async (newBudget) => {
      // get current user from zustand
      const prevUser = useAuthStore.getState().user;

      // update the UI ahead of the request
      useAuthStore.getState().setUser({
        ...prevUser,
        monthlyBudget: newBudget,
      });

      // Return rollback user for request failure case
      return { prevUser };
    },

    // step 2: perform the actual request
    mutationFn: (newBudget) => api.patch("/user/budget", { amount: newBudget }),

    // step 3: we already updated the state in zustand, so just show a toast
    onSuccess: () => {
      setOpenInput(false);
      toast.success("Budget updated successfully!");
    },

    // step 4: on error, rollback to previous state
    onError: (error, _, context) => {
      if (context?.prevUser) {
        useAuthStore.getState().setUser(context.prevUser);
      }

      setOpenInput(false);
      toast.error("Failed to update budget.");

      console.error("Update failed", error);
    },
  });
};
