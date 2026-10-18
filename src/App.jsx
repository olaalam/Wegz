import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "sonner";
import LoginPage          from "./pages/LoginPage";
import AppLayout from "./components/layout/AppLayout";
import ProfilePage from "./pages/ProfilePage";
import Theme from "./pages/Theme/Theme";
import ThemeAdd from "./pages/Theme/ThemeAdd";
import DesignStudio from "./pages/Design/DesignStudio";
import SectionSettings from "./pages/Design/SectionSettings";
import SectionAdd from "./pages/Design/SectionAdd";
import SectionSelect from "./pages/Design/SectionSelect";

// ─── Route guards ─────────────────────────────────────────────────────────────

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

function PublicRoute({ children }) {
  const isAuthenticated = useSelector((s) => s.auth.isAuthenticated);
  return isAuthenticated ? <Navigate to="/themes" replace /> : children;
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        richColors
        toastOptions={{ style: { fontFamily: "var(--font-sans, sans-serif)" } }}
      />

      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route
          path="/login"
          element={<PublicRoute><LoginPage /></PublicRoute>}
        />

        <Route path="/dashboard" element={<Navigate to="/themes" replace />} />
        <Route
          path="/profile"
          element={<PrivateRoute><AppLayout><ProfilePage /></AppLayout></PrivateRoute>}
        />
        <Route
          path="/themes"
          element={<PrivateRoute><AppLayout><Theme /></AppLayout></PrivateRoute>}
        />
        <Route
          path="/themes/add"
          element={<PrivateRoute><AppLayout><ThemeAdd /></AppLayout></PrivateRoute>}
        />
        <Route
          path="/themes/edit/:id"
          element={<PrivateRoute><AppLayout><ThemeAdd /></AppLayout></PrivateRoute>}
        />
<Route path="/admin/website/dashboard" element={<DesignStudio />} />
<Route path="/admin/website/:section/settings" element={<SectionSettings />} />
<Route path="/admin/website/:section/add" element={<SectionAdd />} />
<Route path="/admin/website/:section/select" element={<SectionSelect />} />


        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
