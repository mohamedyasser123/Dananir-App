import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteMembershipPlan } from "../../services/membership.service"
import { MEMBERSHIP_PLAN_QUERY_KEYS } from "../../constants/membership.constants"
import type { MembershipPlan } from "../../types/membership.types"

interface DeleteMembershipPlanContext {
  previousPlans?: MembershipPlan[]
}

export function useDeleteMembershipPlan() {
  const queryClient = useQueryClient()

  return useMutation<{ id: string }, Error, string, DeleteMembershipPlanContext>({
    mutationFn: deleteMembershipPlan,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: MEMBERSHIP_PLAN_QUERY_KEYS.lists() })
      const previousPlans = queryClient.getQueryData<MembershipPlan[]>(MEMBERSHIP_PLAN_QUERY_KEYS.lists())

      queryClient.setQueryData<MembershipPlan[]>(MEMBERSHIP_PLAN_QUERY_KEYS.lists(), (old) =>
        old?.filter((plan) => plan.id !== id)
      )

      return { previousPlans }
    },
    onError: (_error, _id, context) => {
      if (context?.previousPlans) {
        queryClient.setQueryData(MEMBERSHIP_PLAN_QUERY_KEYS.lists(), context.previousPlans)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: MEMBERSHIP_PLAN_QUERY_KEYS.lists() })
    },
  })
}
