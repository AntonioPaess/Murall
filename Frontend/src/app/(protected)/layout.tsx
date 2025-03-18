import AuthChecker from "@/components/auth/AuthChecker"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthChecker>
      {children}
    </AuthChecker>
  )
}

export default Layout
