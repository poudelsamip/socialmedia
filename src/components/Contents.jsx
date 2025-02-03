import Card from "./Card";
import { useAuthentication } from "../store/authProvider";

const Contents = () => {
  const { postList, loading } = useAuthentication();

  return (
    <>
      <div className=" d-flex justify-content-center ">
        {loading ? (
          <div
            className="spinner-border"
            role="status"
            style={{ height: "50px", width: "50px", margin: "50px" }}
          >
            <span className="sr-only"></span>
          </div>
        ) : (
          <div className="contentsColumn ">
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
        )}
      </div>
    </>
  );
};

export default Contents;
