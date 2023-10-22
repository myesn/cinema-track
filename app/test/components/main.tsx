"use client";

import { useState } from "react";
import StatelessChild from "./stateless-child";

export default function Main() {
  const [familyName, setFamilyName] = useState("王");
  const [lastName, setLastName] = useState("小明");
  let fullName = `${familyName}${lastName}`;

  let statelessArray: string[] = ["a", "b"];
  let [statefulArray, setStatefulArray] = useState<string[]>(["a", "b"]);

  // 不被 Dom 节点使用/依赖的 state
  const [notUsedByDom, setNotUsedByDom] = useState("1");

  function handleClick() {
    setFamilyName(`${new Date().getMilliseconds()}`);
    setLastName(`${new Date().getMilliseconds()}`);
    fullName = "giao";
    console.log("familyName", familyName, "lastName", lastName);
  }

  function handleNotUsedByDomClick() {
    setNotUsedByDom(`${new Date().getMilliseconds()}`);
    console.log("notUsedByDom", notUsedByDom);
  }

  function handleChangeArrayClick() {
    setNotUsedByDom(`${new Date().getMilliseconds()}`);
    statelessArray.push(`${new Date().getMilliseconds()}`);
    console.log("statelessArray", statelessArray);

    setStatefulArray((x) => [...x, `${new Date().getMilliseconds()}`]);
    console.log("statefulArray", statefulArray);
  }

  // useEffect(()=> {
  //   handleChangeArrayClick();
  // }, [notUsedByDom])

  console.log("render main");
  return (
    <>
      <button className="bg-indigo-400 p-10" onClick={handleClick}>
        random name
      </button>
      <button className="bg-indigo-100 p-10" onClick={handleNotUsedByDomClick}>
        random notUsedByDom
      </button>
      <button className="bg-indigo-400 p-10" onClick={handleChangeArrayClick}>
        random array
      </button>

      <div className="border-2	p-5">
        <p>stateless array</p>
        <ul>
          {statelessArray.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      <div className="border-2	p-5">
        <p>stateful array</p>
        <ul>
          {statefulArray.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>

      <StatelessChild text={familyName} />
      <StatelessChild text={lastName} />
      <StatelessChild text={fullName} />
    </>
  );
}
