interface UserAlbumsProps {
  userId: string;
}

function UserAlbums({ userId }: UserAlbumsProps) {
  return (
    <>
      <p>Coming soon!</p>
      <p>{userId}</p>
    </>
  );
}

export default UserAlbums;
