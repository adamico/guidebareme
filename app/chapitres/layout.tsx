import Sidebar from "../components/Sidebar";
import BackToTop from "../components/BackToTop";

export default function ChapitresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-72 flex-1 bg-white p-8">
        <article className="prose lg:prose-xl prose-stone mx-auto max-w-4xl text-justify">
          {children}
        </article>
      </main>
      <BackToTop />
    </div>
  );
}
