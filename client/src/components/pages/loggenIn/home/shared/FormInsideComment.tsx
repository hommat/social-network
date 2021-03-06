import React from "react";
import { Form, Comment } from "semantic-ui-react";

type Props = {
  startContent: string;
  onCancel: () => void;
  onSubmit: (content: string) => void;
  proccessing: boolean;
};

const FormInsideComment: React.FC<Props> = ({
  onCancel,
  onSubmit,
  startContent,
  proccessing
}) => {
  const [content, setContent] = React.useState<string>(startContent);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proccessing) onSubmit(content);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!proccessing) setContent(e.target.value);
  };
  const handleCancel = () => {
    if (!proccessing) onCancel();
  };
  return (
    <Comment.Content>
      <Form onSubmit={handleSubmit} className="comments__update">
        <Form.Input
          value={content}
          onChange={handleChange}
          size="small"
          className="comment-update-input posts__input posts__input--right-margin"
          autoFocus
        />
      </Form>
      <Comment.Actions className="comments__update-actions">
        <Comment.Action onClick={() => handleCancel()}>Cancel</Comment.Action>
      </Comment.Actions>
    </Comment.Content>
  );
};

export default FormInsideComment;
