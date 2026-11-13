//Purpose: Abhi sirf stub hai. Hamesha mockUser ko logged-in dikhata hai, aur logout home page par bhej deta hai. Phase 3 mein ye file asli AuthContext se replace hogi, lekin components mein const { user, logout } = useAuth() wahi rahega.
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { mockUser } from "../mock/mockData";

export default function useAuth() {
  const navigate = useNavigate();

  const logout = useCallback(() => navigate("/"), [navigate]);

  return useMemo(
    () => ({ user: mockUser, isAuthenticated: true, logout }),
    [logout]
  );
}