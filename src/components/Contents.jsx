import Card from "./Card";
import { useAuthentication } from "../store/authProvider";

const Contents = () => {
  const { postList } = useAuthentication();

  return (
    <>
      <div className=" d-flex justify-content-center flex-grow-1 overflow-auto">
        <div className="contentsColumn mt-3">
          {postList.map((post) => (
            <Card
              title={post.title}
              body={post.body}
              likes={post.likes}
              email={post.author.email}
              id={post.id}
              likedBy={post.likedBy}
              postList={postList}
              key={post.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Contents;
