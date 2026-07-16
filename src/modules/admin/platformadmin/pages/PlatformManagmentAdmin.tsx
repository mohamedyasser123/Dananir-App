import AdminContent from "../components/AdminContent";
import { useAdmins } from "../hooks/useAdmins";

export default function PlatformManagmentAdmin() {
  const admins = useAdmins();

  return <AdminContent {...admins} />;
}
