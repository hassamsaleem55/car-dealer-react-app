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
    // <div className="bg-linear-to-r from-transparent to-primary/5 text-basicFont min-h-screen">
    <div className="bg-body text-basicFont min-h-screen">
      <MetaManager />
      <LayoutRenderer module="navbar" />
      <AppOutlet />
      <LayoutRenderer module="footer" />
      <ScrollToTopButton />
      <WhatsAppChatButton />
      <Toaster position="top-right" />
    </div>
  );
}
