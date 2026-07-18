import { useQuery } from "@tanstack/react-query"
import { getMembershipPlanById } from "../../services/membership.service"
import { MEMBERSHIP_PLAN_QUERY_KEYS } from "../../constants/membership.constants"

export function useMembershipPlan(id: string | undefined) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: MEMBERSHIP_PLAN_QUERY_KEYS.detail(id ?? ""),
    queryFn: () => getMembershipPlanById(id as string),
    enabled: Boolean(id),
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseMembershipPlanResult = ReturnType<typeof useMembershipPlan>
