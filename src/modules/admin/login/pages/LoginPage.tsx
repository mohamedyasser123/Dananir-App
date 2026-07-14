import { SharedInput } from '../../../../components/shared/SharedInput'
import { SharedButton } from '../../../../components/shared/SharedButton'
import { Eye, EyeOff, Lock } from 'lucide-react'
import loginPicture from "../assets/LoginPicture.png"
import logo from "../../../../assets/logo.png"
import { useLogin } from '../hooks/useLogin'

export default function LoginPage() {
  const { register, errors, isSubmitting, showPassword, togglePasswordVisibility, onSubmit } = useLogin()

return (
  <div className="flex min-h-screen w-full flex-col md:flex-row bg-[#0b1329] text-white overflow-hidden">

    <div className="relative hidden w-1/2 md:block bg-slate-900 border-r border-white/5">
      <img src={loginPicture} alt="loginPicture" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-transparent to-[#0b1329]/40" />
    </div>

    <div className="flex w-full flex-col justify-center items-center px-6 py-12 md:w-1/2 lg:px-24 bg-gradient-to-br from-[#162749] to-[#0d1830] relative">
      <div className="w-full max-w-[420px] flex flex-col items-center justify-center space-y-8">
        <div className="flex flex-col items-center space-y-4 text-center w-full">
          <img src={logo} alt="dananir logo" className="h-28 w-28 object-contain" />

          <h2 className="text-3xl font-semibold tracking-wide text-white">
            Welcome Admin
          </h2>
          <p className="text-sm text-white/50">
            Sign in to your account
          </p>
        </div>

        <form className="flex flex-col gap-6 w-full" onSubmit={onSubmit} noValidate>

          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col gap-1.5 w-full">
              <SharedInput
                type="email"
                placeholder="Admin email"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-400 pl-1 align-start text-left">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <SharedInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                {...register("password")}
                icon={
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                }
              />
              {errors.password && (
                <p className="text-xs text-red-400 pl-1 align-start text-left">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-white/60 w-full">
            <label className="flex items-center gap-2 cursor-pointer select-none hover:text-white">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-white/20 bg-white/5 text-[#2f65cd] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:text-white hover:underline transition-all">
              Forgot password?
            </a>
          </div>

          <div className="w-full">
            <SharedButton type="submit" size="full" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
            </SharedButton>
          </div>

        </form>

        <div className="flex items-center justify-center gap-2 text-[11px] text-white/40 pt-4 w-full">
          <Lock size={12} className="text-[#e2b347]" />
          <span>Your login is secure — never share your information with anyone.</span>
        </div>

      </div>
    </div>
  </div>
)
}
