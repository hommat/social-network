import React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Comment } from "semantic-ui-react";
import { isNull } from "util";

import SubCommentMenu from "./Menu";
import SubCommentUpdate from "./UpdateForm";
import SubCommentContent from "../shared/CommentContent";
import { openReplying } from "../../../../../store/comment/actions";
import { getImage } from "../../../../other/Avatar";
import { RootState } from "MyTypes";
import { SubComment as SubCommentType } from "../../../../../store/subComment/models";
import { User } from "../../../../../store/auth/models";
import { Post } from "../../../../../store/post/models";

type DispatchProps = {
  openReplying: () => void;
};

type OwnProps = {
  subCommentId: string;
  postId: string;
  commentId: string;
};

type StateProps = {
  subComment: SubCommentType;
  post: Post;
  user: User | null;
};

type Props = OwnProps & StateProps & DispatchProps;

type State = {
  updating: boolean;
};

class SubComment extends React.Component<Props, State> {
  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { subCommentId, subComment } = this.props;
    const { content } = subComment;
    if (subCommentId !== nextProps.subCommentId) return true;
    if (content !== nextProps.subComment.content) return true;
    if (this.state.updating !== nextState.updating) return true;
    return false;
  }
  readonly state: State = {
    updating: false
  };
  setUpdating = (updating: boolean) => this.setState({ updating });
  render() {
    const { subComment, user, post, subCommentId, openReplying } = this.props;
    const { updating } = this.state;
    const canDelete: boolean =
      !isNull(user) &&
      (user._id === post.owner || user._id === subComment.owner);
    const canUpdate: boolean = !isNull(user) && user._id === subComment.owner;

    return (
      <Comment>
        <Comment.Avatar src={getImage(subComment.authorGender)} />
        {(canDelete || canUpdate) && !updating && (
          <SubCommentMenu
            canDelete={canDelete}
            canUpdate={canUpdate}
            onUpdateClick={() => this.setUpdating(true)}
            subCommentId={subCommentId}
          />
        )}
        {updating ? (
          <SubCommentUpdate
            subCommentId={subCommentId}
            startContent={subComment.content}
            onUpdateDone={() => this.setUpdating(false)}
            onCancelClick={() => this.setUpdating(false)}
          />
        ) : (
          <SubCommentContent
            opinionData={subComment}
            onReply={() => openReplying()}
          />
        )}
      </Comment>
    );
  }
}

// const SubCommentElement: React.FC<Props> = ({
//   subComment,
//   user,
//   post,
//   subCommentId,
//   openReplying
// }) => {
//   const [updating, setUpdating] = React.useState<boolean>(false);

//   const canDelete: boolean =
//     !isNull(user) && (user._id === post.owner || user._id === subComment.owner);
//   const canUpdate: boolean = !isNull(user) && user._id === subComment.owner;

//   return (
//     <Comment>
//       <Comment.Avatar src={getImage(subComment.authorGender)} />
//       {(canDelete || canUpdate) && !updating && (
//         <SubCommentMenu
//           canDelete={canDelete}
//           canUpdate={canUpdate}
//           onUpdateClick={() => setUpdating(true)}
//           subCommentId={subCommentId}
//         />
//       )}
//       {updating ? (
//         <SubCommentUpdate
//           subCommentId={subCommentId}
//           startContent={subComment.content}
//           onUpdateDone={() => setUpdating(false)}
//           onCancelClick={() => setUpdating(false)}
//         />
//       ) : (
//         <SubCommentContent
//           opinionData={subComment}
//           onReply={() => openReplying()}
//         />
//       )}
//     </Comment>
//   );
// };

const mapStateToProps = (
  state: RootState,
  { subCommentId, postId }: OwnProps
): StateProps => {
  return {
    subComment: state.subComment.byId[subCommentId],
    post: state.post.byId[postId],
    user: state.auth.user
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch,
  { commentId }: OwnProps
): DispatchProps => {
  return {
    openReplying: () => dispatch(openReplying(commentId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubComment);
