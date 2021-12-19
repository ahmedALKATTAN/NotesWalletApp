import { useState, useEffect } from "react";

const useForm = (callback, validate) => {
  const [Info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    console.log(event.name);
    const { name, value } = event.target;
    setInfo((privous) => {
      return {
        ...privous,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(Info));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  return { handleChange, handleSubmit, Info, errors };
};

export default useForm;
