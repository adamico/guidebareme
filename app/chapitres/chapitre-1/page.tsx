import { chapitre1 } from "../../content/chapitre-1";

export default function Chapitre1() {
  return (
    <div dangerouslySetInnerHTML={{ __html: chapitre1 }} />
  );
}
