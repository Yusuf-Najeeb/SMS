// 'use client'


// import React, { useEffect, useRef , useState} from "react"; 

// // import { SpecialCharacters } from '@ckeditor/ckeditor5-special-characters';

// const editorConfiguration = {
//     plugins: [
//         SpecialCharacters
//       ],
//     toolbar: [
//         'heading',
//         '|',
//         'bold',
//         'italic',

//         // 'link',

//         'bulletedList',
//         'numberedList',
//         '|',
//         'outdent',
//         'indent',
//         '|',

//         // 'imageUpload',
//         // 'blockQuote',
//         // 'insertTable',

//         // 'mediaEmbed',
//         // 'SpecialCharacters', 'SpecialCharactersCurrency', 'SpecialCharactersMathematical',

//         'undo',
//         'redo'
//     ]
// };

// export default function CKeditor() {

//     const [editorLoaded, setEditorLoaded] = useState(false)

//     const editorRef = useRef();

//     const { CKEditor, ClassicEditor, } = editorRef.current || {};

//     // const { CKEditor, ClassicEditor } = editorRef.current || {};

//     useEffect(()=>{
//         setEditorLoaded(true)
//     },[])
    
//     useEffect(() => {
//     editorRef.current = {
//          CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, 
//          ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),

//         //  SpecialCharacters: require("@ckeditor/ckeditor5-special-characters").specialCharacters
//         };
//     }, []);

//     return (
//         <>
//             {editorLoaded ? (
//                 <CKEditor
//                     type=""
//                     name='question'
//                     editor={ClassicEditor}
//                     data={''}
//                     config={ editorConfiguration }

//                     onChange={ ( event, editor ) => {

//                      const data = editor.getData();

//                     console.log( { event, editor, data } );

//                     } }

//                     // onChange={(event, editor) => {
//                     //     const data = editor.getData();
//                     //     onChange(data);
//                     // }}
//                 />
//             ) : (
//                 <div>Editor loading</div>
//             )}
//         </>
//     )
// }

import React from 'react'

const index = () => {
  return (
    <div>index</div>
  )
}

export default index