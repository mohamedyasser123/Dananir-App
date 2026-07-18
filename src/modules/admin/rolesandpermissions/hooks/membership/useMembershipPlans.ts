import { useQuery } from "@tanstack/react-query"
import { getMembershipPlans } from "../../services/membership.service"
import { MEMBERSHIP_PLAN_QUERY_KEYS } from "../../constants/membership.constants"

export function useMembershipPlans() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: MEMBERSHIP_PLAN_QUERY_KEYS.lists(),
    queryFn: getMembershipPlans,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseMembershipPlansResult = ReturnType<typeof useMembershipPlans>
