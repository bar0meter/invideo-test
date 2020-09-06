import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import InputField from "./UI/InputField";

const INPUT_CHANGE = "INPUT_CHANGE";

const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
      };
    default:
      return state;
  }
};

const Form = (props) => {
  const [formData, setFormData] = useState();
  const [step, setStep] = useState(0);
  const loadFormData = async () => {
    const res = await axios.get(
      "https://ttv-videos.s3.ap-south-1.amazonaws.com/questions.json"
    );
    if (res) {
      setFormData(res.data.questions);
    }
  };
  useEffect(() => {
    loadFormData();
  }, [loadFormData, axios]);

  const changeStepHandler = (changeBy) => {
    setStep((prevStep) => {
      if (prevStep < formData.length) {
        return prevStep + changeBy;
      }

      return prevStep;
    });
  };

  const stepData = !!formData ? formData[step] : [];

  return (
    <div>
      {!!formData && (
        <div>
          <div>{stepData.type}</div>
          <div>
            {!!stepData.questions &&
              stepData.questions.map(({ question, type, options }, index) => (
                <div key={index}>
                  <InputField
                    label={question}
                    type={type}
                    options={!!options ? options : []}
                  />
                </div>
              ))}
          </div>
          {step !== 0 && (
            <button onClick={() => changeStepHandler(-1)}>Previous</button>
          )}
          {step !== formData.length && (
            <button onClick={() => changeStepHandler(1)}>Next</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Form;
