import PublicRouteChecker from "@/components/auth/PublicRouteChecker"

const Layout = ({children} : {children : React.ReactNode}) => {
    return (
        <PublicRouteChecker>
            {children}
        </PublicRouteChecker>
    )
}

export default Layout;