import { useQuery } from "@tanstack/react-query"
import { getChats } from "../../services/communication.service"
import { CHAT_QUERY_KEYS } from "../../constants/communication.constants"

export function useChats() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: CHAT_QUERY_KEYS.lists(),
    queryFn: getChats,
  })

  return {
    data,
    isLoading,
    isError,
    error,
    refetch,
  }
}

export type UseChatsResult = ReturnType<typeof useChats>
