import { Auth0Provider } from "@auth0/nextjs-auth0";
import ProfileCheck from "@/components/ProfileCheck";
import ChatBot from "@/components/ChatBot";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Auth0Provider>
      <ProfileCheck />
      {children}
      <ChatBot />
    </Auth0Provider>
  );
}
