import Editor from "../Editor";

interface PageProps {
  params: {
    id: string;
  };
}

const editorPage: React.FC<PageProps> = ({ params }) => {
  const { id } = params;
  console.log("id-----------", id);
  return <Editor />;
};
export default editorPage;
