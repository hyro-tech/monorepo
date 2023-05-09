import React, { useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { EditorState, convertFromRaw } from 'draft-js';

const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

const StyledEditor = styled.div`
  .public-DraftStyleDefault-block {
    margin: 0;
  }
`;

const EditorViewer = ({ content }) => {
  const [state] = useState(EditorState.createWithContent(convertFromRaw(JSON.parse(content))));

  return (
    <StyledEditor>
      <Editor toolbarHidden readOnly editorState={state} />
    </StyledEditor>
  );
};

export default EditorViewer;
