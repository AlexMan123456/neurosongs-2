interface UserSongsProps {
  userId: string;
}

function UserSongs({ userId }: UserSongsProps) {
  return (
    <>
      <p>Coming soon!</p>
      <p>{userId}</p>
    </>
  );
}

export default UserSongs;
