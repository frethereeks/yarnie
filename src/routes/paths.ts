/**
 * Auth Routes.
 * This is a list of routes or pages that are used for authentication. e.g login, register etc
 */
export const authRoutes = {
    // auth
    signIn: "/auth/login",
    signUp: "/auth/register",
};

/**
 * Admin Routes
 * This is a list of routes or pages that are used for authentication of the admin. e.g dashboard, orders management etc
 */
export const adminRoutes = {
    admindashboard: "/admin/dashboard",
    adminshop: "/admin/shop",
    admincontact: "/admin/contact",
    adminuser: "/admin/users",
    adminshopEdit: (id:string) =>  `/admin/shop/edit/${id}`,
    adminprofile: "/admin/profile",
    adminsales: "/admin/sales",
}

/**
 * Public Routes
 * This is a list of routes or pages that are accessible to the everyone without a need to login  e.g homepage, menu, contact us etc
 */
export const publicRoutes = {
    home: "/",
    about: "/about",
    cart: "/cart",
    contact: "/contact",
    shop: "/shop",
    search: "/search",
    singleShop: (id: string) => `/shop/${id}`,
    signin: "/auth/login",
    signup: "/auth/register",
    sitemap: "/sitemap",
    verify: "/auth/verify",
    logout: "/auth/logout",
}
/**
 * App Route Paths
 * This is a combination of all the available routes/pages i.e. authRoutes, adminRoutes, publicRoutes etc
 */
export const appRoutePaths = {
    ...authRoutes,
    ...adminRoutes,
    ...publicRoutes,
    googleMap: `https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d31512.579717641827!2d7.3111099928578644!3d9.147928198948978!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sf01%20kubwa!5e0!3m2!1sen!2sng!4v1740609044843!5m2!1sen!2sng`
}