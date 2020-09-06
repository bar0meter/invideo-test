import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import InputField from "./UI/InputField";

const Form = (props) => {
  const [formData, setFormData] = useState();
  const [step, setStep] = useState(0);

  const [userData, setUserData] = useState({});

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

  const valueChangeHandler = (step, questionIndex, value) => {
    setUserData((prevState) => {
      const newState = { ...prevState };
      const prevStepValue = newState[step];
      const newStepValue = !!prevStepValue ? prevStepValue : {};
      newStepValue[questionIndex] = value;
      newState[step] = newStepValue;
      setUserData(newState);
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
                    onValueChange={(value) =>
                      valueChangeHandler(step, index, value)
                    }
                    initalValue={
                      !!userData && !!userData[step] && !!userData[step][index]
                        ? userData[step][index]
                        : ""
                    }
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
