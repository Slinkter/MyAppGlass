import type { Metadata } from "next";
import { BlogAdminScreen } from "@/screens/Admin/BlogAdminScreen";
import { AdminRouteGuard } from "@/features/auth/components/AdminRouteGuard";

export const metadata: Metadata = {
  title: "Gestión de Blog",
  description: "Administración de artículos del blog corporativo en Firestore.",
  robots: { index: false, follow: false },
};

export default function AdminBlogPage() {
  return (
    <AdminRouteGuard>
      <BlogAdminScreen />
    </AdminRouteGuard>
  );
}
