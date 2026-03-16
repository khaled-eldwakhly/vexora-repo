import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";
import AuthProvider from "@/providers/auth-provider";
import CartQuantityContext from "@/providers/cart-quantity-context";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import QueryClientProviders from "../providers/query-client-provider";
import "./globals.css";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vexora",
  description: "Developed by Khaled Eldwakhly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartQuantityContext>
            <QueryClientProviders>
              <SidebarProvider className="inline-block">
                <Navbar />
                <AppSidebar />
                <main className="px-6">
                  {children}
                  <Toaster richColors />
                </main>
              </SidebarProvider>
            </QueryClientProviders>
            <Footer />
          </CartQuantityContext>
        </AuthProvider>
      </body>
    </html>
  );
}
