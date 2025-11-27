import { introduction } from "../content/introduction";

export default function Home() {
  return (
    <div dangerouslySetInnerHTML={{ __html: introduction }} />
  );
}
