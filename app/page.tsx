"use client";

import { useState } from "react";
import { Button } from "./components/ui/Button";
import Input from "./components/ui/Input";
import { Select } from "./components/ui/Select";

export default function Home() {
  const [selected, setSelected] = useState("");

  const values = ["apple", "banana", "orange"];

  return (
    <div className="space-y-10 p-10">
      <Button>Primary</Button>
      <div className="space-x-8 flex">
        <Input type="text" placeholder="placeholder" />
        <Select onValueChange={setSelected} value={selected}>
          <Select.Trigger />
          <Select.Content>
            {values.map((value) => (
              <Select.Item key={value} val={value} />
            ))}
          </Select.Content>
        </Select>
      </div>
    </div>
  );
}
