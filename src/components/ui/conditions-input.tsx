import { LucideX, PlusCircle } from "lucide-react";
import React from "react";
import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

interface Props {
  conditions: string[];
  maxConditions: number;
  listener: (conditions: string) => void;
}

const ConditionsInput: React.FC<Props> = ({
  conditions,
  maxConditions,
  listener,
}) => {
  const [inputValues, setInputValues] = useState<string[]>(conditions);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
    updateListener()
  };

  const handleRemove = (index: number) => {
    const newInputValues = inputValues.filter((_, i) => i !== index);
    setInputValues(newInputValues);
  };

  const addNewInput = () => {
    if (inputValues.length >= maxConditions) return;
    setInputValues([...inputValues, ""]);
    updateListener();
  };

  const updateListener = () => {
    const newValues = inputValues.reduce((acc, value) => {
      acc = `${acc}\n${value}`;
      return acc;
    }, "");

    listener(newValues);
  };

  return (
    <div className="flex flex-col gap-3">
      {(inputValues.length == 0 ? [...inputValues, ""] : inputValues).map(
        (value, index, vals) => (
          <div key={index}>
            <span className="flex flex-row gap-1">
              <Input
                type="text"
                value={value}
                className="min-w-[300px]"
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
              { index != 0 && index == vals.length - 1 && (
                <button type="button" onClick={() => handleRemove(index)}>
                  <LucideX />
                </button>
              )}
            </span>
          </div>
        )
      )}

      <Button type="button" onClick={addNewInput}>
        Add a Condition <PlusCircle />
      </Button>
    </div>
  );
};

export default ConditionsInput;
