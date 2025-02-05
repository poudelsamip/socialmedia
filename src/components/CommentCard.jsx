const CommentCard = ({ comment }) => {
  return (
    <div className="border rounded">
      <span className="text-secondary">{comment.commenter}</span>
      <p className="h6">{comment.commentBody}</p>
    </div>
  );
};

export default CommentCard;
