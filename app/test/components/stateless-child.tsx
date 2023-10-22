export default function StatelessChild(props: StatelessChildProps) {
  return (
    <>
      <p>StatelessChild: {props.text}</p>
    </>
  );
}

interface StatelessChildProps {
  text: string;
}
