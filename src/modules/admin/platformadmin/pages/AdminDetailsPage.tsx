import { useParams } from "react-router-dom";
import AdminDetailsContent from "../components/AdminDetailsContent";
import { useAdmin } from "../hooks/useAdmin";

export default function AdminDetailsPage() {
  const { id } = useParams();
  const admin = useAdmin(id);

  return <AdminDetailsContent {...admin} />;
}
