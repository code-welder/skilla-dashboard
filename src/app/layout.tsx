import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import { Grid } from "./components/Grid";
import { DashboardLogo } from "./components/DashboardLogo";
import { SideMenu } from "./components/SideMenu";

const primaryFont = localFont({
  src: [
    {
      path: "./fonts/SF-Pro-Display-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/SF-Pro-Display-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={primaryFont.className}>
        <Grid topLeftSlot={<DashboardLogo />} leftSlot={<SideMenu />} rightSlot={children} />
      </body>
    </html>
  );
}
