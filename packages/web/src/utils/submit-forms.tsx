import type React from 'react';
import { useState } from 'react';

const SubmitForm = (callback: any, stateInitial: any) => {
  const [values, setValues] = useState(stateInitial);

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setValues({ ...values, [event.target.name]: [event.target.value][0] });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await callback();
  };

  return { onChange, onSubmit, values };
};

export default SubmitForm;
