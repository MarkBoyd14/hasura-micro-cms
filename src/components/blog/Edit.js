import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { Input, Button } from '../shared/Form';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  > button {
    margin-left: 1rem;
  }
`;

const EDIT_BLOG = gql`
  mutation($id: uuid!, $body: String!, $title: String!) {
    update_blogs_by_pk(
      pk_columns: { id: $id }
      _set: { body: $body, title: $title }
    ) {
      id
      title
      body
    }
  }
`;

export default function Edit(props) {
  const { match, location, history } = props;
  const { id } = match.params;
  const [title, setTitle] = useState(location.state.title);
  const [body, setBody] = useState(location.state.body);

  const [editBlog] = useMutation(EDIT_BLOG, { variables: { id } });

  console.log(title);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        editBlog({ variables: { title: title, body: body } });
        history.push('/blog');
      }}
    >
      <label>Title</label>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <label>Body</label>
      <Input value={body} onChange={(e) => setBody(e.target.value)} />
      <Button type="submit" value="submit">
        Submit
      </Button>
    </Form>
  );
}