type AuthorsProps = {
  authors: String[] | undefined;
};

const Authors: React.FC<AuthorsProps> = ({ authors }) => {
  return (
    <>
      {authors && authors?.length >= 4
        ? `${authors?.splice(1).join(", ")}...`
        : authors?.join(", ")}
    </>
  );
};

export default Authors;
