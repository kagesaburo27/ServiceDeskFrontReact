import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useRef } from "react";
const QuillEditor = ({ value, defaultValue, onChange }) => {
  const quillRef = useRef(null);
  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post("/image/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const imageUrl = response.data.imageUrl;
      const range = quillRef.current.getEditor().getSelection();
      quillRef.current.getEditor().insertEmbed(range.index, "image", imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
  };

  return (
    <ReactQuill
      
      value={value || null}
      defaultValue={defaultValue || null}
      onChange={onChange}
      modules={modules}
      theme="snow"
      ref={quillRef}
    />
  );
};

export default QuillEditor;
