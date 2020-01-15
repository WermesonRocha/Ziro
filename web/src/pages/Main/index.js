import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Link } from "react-router-dom";

import { FaUser, FaSpinner } from "react-icons/fa";

import Container from "../../components/Container";
import Form from "../../components/Form";
import SubmitButton from "../../components/SubmitButton";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import InvalidFormMessage from "../../components/InvalidFormMessage";
import { List, EmptyUsers } from "./styles";

import api from "../../services/api";

import validationSchema from "../../validators/form";

const Main = () => {
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

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
      age: parseInt(age)
    };
    if (!(await validationSchema.isValid(user))) {
      setErrors({ ...errors, submit: true });
    }
    const response = await api.post("/users", { ...user });
    user.id = response.data.id;
    user.created_at = response.data.created_at;
    setUsers([...users, user]);
    await localStorage.setItem("users", JSON.stringify([...users, user]));
    resetProperties();
    setLoading(false);
  };

  useEffect(() => {
    async function getAllUsers() {
      const resp = await api.get("users");
      setUsers([...resp.data]);
      await localStorage.setItem("users", JSON.stringify(resp.data));
      setLoader(false);
    }
    const localUsers = localStorage.getItem("users");
    if (localUsers) {
      setUsers(JSON.parse(localUsers));
      setLoader(false);
    } else {
      getAllUsers();
    }
  }, []);

  if (loader) {
    return (
      <Loader>
        <FaSpinner color="#FFF" size={100} />
        <strong>Carregando</strong>
      </Loader>
    );
  }

  return (
    <Container>
      <h1>
        <FaUser />
        Usuários
      </h1>

      {errors.submit && (
        <InvalidFormMessage>
          O formulário deve ser preenchido corretamente !
        </InvalidFormMessage>
      )}

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
      {users ? (
        <List>
          {users.map(user => (
            <li key={user.id}>
              <span>{`${user.first_name} ${user.last_name}`}</span>
              <Link to={`/details/${user.id}`}>Detalhes</Link>
            </li>
          ))}
        </List>
      ) : (
        <>
          <br />
          <EmptyUsers>Nenhum usuário cadastrado</EmptyUsers>
        </>
      )}
    </Container>
  );
};

export default Main;
