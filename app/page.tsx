"use client";

import { useState } from "react";
import { Button } from "./components/ui/Button";
import Input from "./components/ui/Input";
import { Select } from "./components/ui/Select";
import { Dialog } from "./components/ui/Dialog";

export default function Home() {
  const [selected, setSelected] = useState("");

  const values = ["apple", "banana", "orange"];

  return (
    <div className="space-y-10 p-10">
      <Button>Primary</Button>
      <div className="flex">
        <Input type="text" placeholder="placeholder" />
        <Select onValueChange={setSelected} value={selected}>
          <Select.Trigger />
          <Select.Content>
            {values.map((value) => (
              <Select.Item key={value} val={value} />
            ))}
          </Select.Content>
        </Select>
        <Dialog>
          <Dialog.Trigger variant="ghost">open</Dialog.Trigger>
          <Dialog.Content>
            <h2 className="text-xl text-center">Login</h2>
          </Dialog.Content>
        </Dialog>
      </div>
    </div>
  );
}
