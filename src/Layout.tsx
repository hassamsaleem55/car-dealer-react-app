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
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <MetaManager />
      <LayoutRenderer module="navbar" />
      <main id="main-content">
        <AppOutlet />
      </main>
      <LayoutRenderer module="footer" />
      <ScrollToTopButton />
      <WhatsAppChatButton />
      <Toaster position="top-right" />
    </div>
  );
}
