export default function UserBlock(props: UserBlockProps) {
  const { user } = props;

  if (!user) {
    return (
      <p
        className="py-5 underline cursor-pointer"
        onClick={props.onSigninClick}
      >
        signin
      </p>
    );
  }

  const { email } = user;
  const [username] = email?.split("@") ?? [];

  return (
    <p className="py-5 underline cursor-pointer" onClick={props.onSignoutClick}>
      <span className="no-underline">{username}</span> - signout
    </p>
  );
}

interface User {
  id: string;
  email: string;
}

export interface UserBlockProps {
  user: User | null;
  onSigninClick: () => void;
  onSignoutClick: () => void;
}