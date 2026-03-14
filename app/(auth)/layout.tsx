import { Auth0Provider } from "@auth0/nextjs-auth0";
import ProfileCheck from "@/components/ProfileCheck";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Auth0Provider>
      <ProfileCheck />
      {children}
    </Auth0Provider>
  );
}
