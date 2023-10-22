"use client";

import { useState } from "react";
import StatelessChild from "./stateless-child";

export default () => {
  const [familyName, setFamilyName] = useState('王')
  const [lastName, setLastName] = useState('小明')
  let fullName = `${familyName}${lastName}`;

  function handleClick() {
    setFamilyName(`${new Date().getMilliseconds()}`)
    setLastName(`${new Date().getMilliseconds()}`)
    fullName = 'giao';
    console.log(familyName, lastName)  ;
  }
  console.log('render main')

  return (
    <>
      <button className="bg-indigo-400 p-10" onClick={handleClick}>
        click me
      </button>
      <StatelessChild text={familyName} />
      <StatelessChild text={lastName} />
      <StatelessChild text={fullName} />
    </>
  );
};
