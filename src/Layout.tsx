import { ScrollRestoration } from "react-router-dom";
import LayoutRenderer from "@core-dir/layout-renderer";
import MetaManager from "@app-layout-dir/MetaManager";
import {
  ScrollToTopButton,
  WhatsAppChatButton,
} from "@components-dir/floating-buttons";
import AppOutlet from "./AppOutlet";
import { Toaster } from "sonner";

export default function Layout() {
  return (
    <div className="bg-body text-basicFont min-h-screen">
      <MetaManager />
      <LayoutRenderer module="navbar" />
      <AppOutlet />
      <LayoutRenderer module="footer" />
      <ScrollToTopButton />
      <WhatsAppChatButton />
      <Toaster position="top-right" />
      <ScrollRestoration />
    </div>
  );
}
