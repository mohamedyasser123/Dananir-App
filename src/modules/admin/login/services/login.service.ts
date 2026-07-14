import { axiosClient } from "../../../../api/axiosClient"
import type { LoginPayload, LoginResponse } from "../types/login.types"

export async function loginService(payload: LoginPayload): Promise<LoginResponse> {
  const { data } = await axiosClient.post<LoginResponse>("/auth/login", payload)
  return data
}
