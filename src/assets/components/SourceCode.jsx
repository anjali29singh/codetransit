import { useState } from "react";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
  maxRetries: 0,
});

async function getCompletion(req) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "convert given code into python code",
      },
      {
        role: "user",
        content: req,
      },
    ],
    model: "gpt-3.5-turbo-16k-0613",
  });

  return completion.choices[0].message;
}

export default function SourceCode() {
  const [enteredCode, setEnteredCode] = useState("");
  const [data, setData] = useState("");

  const handleChange = (e) => {
    // if(e.target.value==='' || !e.target.value){

    // }
    setEnteredCode(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const x = await getCompletion(enteredCode);
    setData(x.content);
    console.log(data);
  };

  return (
    <div className="inputBox">
      <textarea
        className="text-area"
        placeholder="enter code here"
        onChange={handleChange}
      ></textarea>
      <button title="Click Me" className="btn" onClick={handleClick}>
        Click Me
      </button>
    </div>
  );
}
