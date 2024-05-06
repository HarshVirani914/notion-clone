import Editor from "@/modules/editor/Editor";

interface PageProps {
  params: {
    id: string;
  };
}

const editorPage: React.FC<PageProps> = ({ params }) => {
  const { id } = params;
  return <Editor pageId={id} />;
};
export default editorPage;
