import { useQuery } from "@tanstack/react-query"
import { getAdminById } from "../services/admin.service"
import { ADMIN_QUERY_KEYS } from "../constants/admin.constants"

export function useAdmin(id: string | undefined) {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.detail(id ?? ""),
    queryFn: () => getAdminById(id as string),
    enabled: Boolean(id),
  })
}
