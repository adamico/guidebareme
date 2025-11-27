import { chapitre8 } from "../../content/chapitre-8";

export default function Chapitre8() {
  return (
    <div className="min-h-screen bg-white p-8 font-sans text-gray-900">
      <main className="mx-auto max-w-4xl">
        <article
          className="prose lg:prose-xl prose-stone max-w-none"
          dangerouslySetInnerHTML={{ __html: chapitre8 }}
        />
      </main>
    </div>
  );
}
