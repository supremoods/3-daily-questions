'use client';
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface Config {
  initVal?: string;
  height?: number;
  id?:string;
  onEditorChange: (content: string) => void; // Callback prop added
}

const TextEditor: React.FC<Config> = ({ initVal, height = 400, id, onEditorChange }) => {
  const editorRef = useRef<any>(null);

  const log = () => {
 // Invoke the callback function with the content

    if (editorRef.current) {
      const content = editorRef.current?.getContent();
      console.log('content :>> ', content);
      onEditorChange(content); // Invoke the callback function with the content
    }
  };

  return (
    <>
      <Editor
        id={`${id}a3exuycbq5fsaq6591eh5qpmrhi2bprziwqa6uba6riu5zfl`}
        apiKey="a3exuycbq5fsaq6591eh5qpmrhi2bprziwqa6uba6riu5zfl"
        onInit={(evt, editor) => {
            editorRef.current = editor
        }}
        onChange={(evt, editor) => log()}
        initialValue={initVal || `<p>${initVal}</p>`}
        init={{
          height: height,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />
    </>
  );
};

export default TextEditor;
