export const API_ENDPOINTS = {
  AUTH: {
    FACEBOOK: "auth/facebook",
    LOGOUT:   "auth/logout",
  },
  USER: {
    DASHBOARD:      "/api/admin/dashboard/sections",
    PROFILE:        "/api/auth/me",
    HISTORY_ORDERS: "/api/user/history_orders",
    PENDING_ORDERS: "/api/user/pending_orders",
  },
  THEME :{
    GET: "/api/admin/themes",
    CREATE: "/api/admin/themes",
    UPDATE: "/api/admin/themes/{id}",
    ACTIVATE: "/api/admin/themes/{id}/activate",
    DELETE: "/api/admin/themes/{id}",
  }

};
