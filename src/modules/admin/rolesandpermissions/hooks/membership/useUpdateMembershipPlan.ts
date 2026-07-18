import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMembershipPlan } from "../../services/membership.service"
import { MEMBERSHIP_PLAN_QUERY_KEYS } from "../../constants/membership.constants"
import type { MembershipPlan } from "../../types/membership.types"
import type { UpdateMembershipPlanFormValues } from "../../schemas/membership.schema"

interface UpdateMembershipPlanContext {
  previousPlans?: MembershipPlan[]
}

export function useUpdateMembershipPlan() {
  const queryClient = useQueryClient()

  return useMutation<MembershipPlan, Error, UpdateMembershipPlanFormValues, UpdateMembershipPlanContext>({
    mutationFn: updateMembershipPlan,
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: MEMBERSHIP_PLAN_QUERY_KEYS.lists() })
      const previousPlans = queryClient.getQueryData<MembershipPlan[]>(MEMBERSHIP_PLAN_QUERY_KEYS.lists())

      queryClient.setQueryData<MembershipPlan[]>(MEMBERSHIP_PLAN_QUERY_KEYS.lists(), (old) =>
        old?.map((plan) => (plan.id === payload.id ? { ...plan, ...payload, features: plan.features } : plan))
      )

      return { previousPlans }
    },
    onError: (_error, _payload, context) => {
      if (context?.previousPlans) {
        queryClient.setQueryData(MEMBERSHIP_PLAN_QUERY_KEYS.lists(), context.previousPlans)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: MEMBERSHIP_PLAN_QUERY_KEYS.lists() })
    },
  })
}
