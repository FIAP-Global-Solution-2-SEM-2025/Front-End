import Header from "./Header";
import Footer from "./Footer";

export function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black transition">
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </div>
  );
}
