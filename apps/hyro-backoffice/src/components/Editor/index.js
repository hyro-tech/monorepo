import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const Container = styled.div`
  border: solid 1px gray;
  border-radius: ${(props) => props.theme.border.large};
  padding: 16px;
  min-height: 300px;

  .public-DraftStyleDefault-block {
    margin: 0;
  }
`;

const SSREditor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), {
  ssr: false,
});

function getInitialState(value) {
  if (value) return EditorState.createWithContent(convertFromRaw(JSON.parse(value)));
  return EditorState.createEmpty();
}

const Editor = ({ value, setValue, disabled, error }) => {
  const [savedValue] = useState(value);
  const [state, setState] = useState(getInitialState(value));

  function handleChange(data) {
    setState(data);
    setValue(JSON.stringify(convertToRaw(data.getCurrentContent())));
  }

  useEffect(() => {
    if (!value || value === savedValue) {
      setState(getInitialState(value));
    }
  }, [value]);

  return (
    <Container error={error}>
      <SSREditor
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
        }}
        toolbarHidden={disabled}
        readOnly={disabled}
        editorState={state}
        onEditorStateChange={handleChange}
      />
    </Container>
  );
};

export default Editor;
