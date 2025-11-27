import { introduction } from "../content/introduction";
import HighlightedContent from "../components/HighlightedContent";

export default function Home() {
  return <HighlightedContent html={introduction} />;
}
