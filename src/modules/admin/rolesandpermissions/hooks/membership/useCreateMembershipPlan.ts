import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createMembershipPlan } from "../../services/membership.service"
import { MEMBERSHIP_PLAN_QUERY_KEYS } from "../../constants/membership.constants"

export function useCreateMembershipPlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createMembershipPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMBERSHIP_PLAN_QUERY_KEYS.lists() })
    },
  })
}
