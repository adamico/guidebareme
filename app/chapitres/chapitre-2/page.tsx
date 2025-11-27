import { chapitre2 } from "../../content/chapitre-2";

export default function Chapitre2() {
  return (
    <div className="min-h-screen bg-white p-8 font-sans text-gray-900">
      <main className="mx-auto max-w-4xl">
        <article
          className="prose lg:prose-xl prose-stone max-w-none"
          dangerouslySetInnerHTML={{ __html: chapitre2 }}
        />
      </main>
    </div>
  );
}
