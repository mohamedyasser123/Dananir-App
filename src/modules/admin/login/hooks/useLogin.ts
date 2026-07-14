import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { loginSchema, type LoginFormValues } from "../schemas/login.schema"

export function useLogin() {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev)

  // TODO: wire up loginService once the auth API is ready
  const onSubmit = handleSubmit(async () => {
    navigate("/admin/dashboard")
  })

  return {
    register,
    errors,
    isSubmitting,
    showPassword,
    togglePasswordVisibility,
    onSubmit,
  }
}
