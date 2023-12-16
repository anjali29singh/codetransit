import { useState } from "react";
import OpenAI from "openai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IconContext } from "react-icons";
import { FaArrowCircleRight } from "react-icons/fa";

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
        content: `convert given code into ${req.selectedLang} code`,
      },
      {
        role: "user",
        content: req.enteredCode,
      },
    ],
    model: "gpt-3.5-turbo-16k-0613",
  });

  return completion.choices[0].message;
}

export default function SourceCode() {
  const [enteredCode, setEnteredCode] = useState("");
  const [data, setData] = useState("");
  const [selectedLang, setSelectedLang] = useState("python");

  const content = { enteredCode, selectedLang };
  //handle text area change

  const handleChange = (e) => {
    setEnteredCode(e.target.value);
  };

  //handle button click

  const handleClick = async (e) => {
    e.preventDefault();
    if (enteredCode === "") {
      toast("Please enter code");
      return;
    }
    toast.info("Please wait while we convert your code");
    const x = await getCompletion(content);
    setData(x.content);
    console.log(x.content);
    toast.success("Code converted successfully");
    setData(x.content);
  };

  const onChangeLang = async (e) => {
    setSelectedLang(e.target.value);

    const y = await getCompletion(content);
    setData(y.content);
  };

  return (
    <div className="main">
      <div className="inputBox">
        <ToastContainer />
        <textarea
          className="text-area"
          placeholder="enter code here"
          onChange={handleChange}
        ></textarea>
        <IconContext.Provider
          value={{ color: "green", className: "submitBtn", size: "2em" }}
        >
          <FaArrowCircleRight onClick={handleClick} />
        </IconContext.Provider>
      </div>
      <div className="outputBox">
        <select
          className="select-lang"
          style={{ fontSize: "medium" }}
          onChange={onChangeLang}
        >
          <option value="python">Python</option>
          <option value="javascript">Javascript</option>
          <option value="c++">C++</option>
          <option value="java">Java</option>
        </select>
      </div>
    </div>
  );
}
