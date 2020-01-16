import React, { useState } from "react";
import * as Yup from "yup";
import { FaSpinner } from "react-icons/fa";

import Form from "../Form";
import ErrorMessage from "../ErrorMessage";
import SubmitButton from "../SubmitButton";

const FormFunctional = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [loader, setLoader] = useState(true);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const handleNameChange = async e => {
    Yup.string()
      .required("Nome é obrigatório")
      .validate(e.target.value)
      .then(() => {
        setErrors({ ...errors, first_name: null });
      })
      .catch(error => {
        setErrors({ ...errors, first_name: error.errors[0] });
      });
    setFirstName(e.target.value);
  };

  const handleLastNameChange = e => {
    Yup.string()
      .required("Sobrenome é obrigatório")
      .validate(e.target.value)
      .then(() => {
        setErrors({ ...errors, last_name: null });
      })
      .catch(error => {
        setErrors({ ...errors, last_name: error.errors[0] });
      });
    setLastName(e.target.value);
  };

  const handleEmailChange = e => {
    Yup.string()
      .email("E-mail inválido")
      .required("O e-mail é obrigatório")
      .validate(e.target.value)
      .then(() => {
        setErrors({ ...errors, email: null });
      })
      .catch(error => {
        setErrors({ ...errors, email: error.errors[0] });
      });
    setEmail(e.target.value);
  };

  const handleAgeChange = e => {
    Yup.number("A idade deve ser dada em números")
      .required("A idade é obrigatória")
      .validate(parseInt(e.target.value))
      .then(() => {
        setErrors({ ...errors, age: null });
      })
      .catch(() => {
        setErrors({
          ...errors,
          age: "A idade é obrigatória e deve ser dada em números"
        });
      });
    setAge(e.target.value);
  };

  const resetProperties = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAge("");
    setErrors({});
  };

  return (
    <Form onSubmit={e => handleSubmit(e)}>
      <input
        type="text"
        placeholder="Nome"
        onChange={e => handleNameChange(e)}
        value={firstName}
      />
      {errors.first_name && <ErrorMessage>{errors.first_name}</ErrorMessage>}
      <input
        type="text"
        placeholder="Sobrenome"
        onChange={e => handleLastNameChange(e)}
        value={lastName}
      />
      {errors.last_name && <ErrorMessage>{errors.last_name}</ErrorMessage>}
      <input
        type="email"
        placeholder="Email"
        onChange={e => handleEmailChange(e)}
        value={email}
      />
      {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
      <input
        type="text"
        placeholder="Idade"
        onChange={e => handleAgeChange(e)}
        value={age}
      />
      {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
      <SubmitButton type="submit" loading={loading}>
        {loading ? <FaSpinner color="#FFF" size={14} /> : "Adicionar Usuário"}
      </SubmitButton>
    </Form>
  );
};

export default FormFunctional;
