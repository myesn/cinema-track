import { Title } from "@tremor/react";
import CinemaList from "../components/CinemaList";

export default () => {
  return (
    <main className="px-10">
      <Title color="green" className="py-5">
        cenima records
      </Title>
      <CinemaList />
    </main>
  );
};
