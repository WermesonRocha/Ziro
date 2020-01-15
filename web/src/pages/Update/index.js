import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FaPenSquare, FaSpinner } from "react-icons/fa";

import api from "../../services/api";

import Container from "../../components/Container";
import Form from "../../components/Form";
import SubmitButton from "../../components/SubmitButton";
import Loader from "../../components/Loader";

export default function Update({ match }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const handleNameChange = e => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = e => {
    setLastName(e.target.value);
  };

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handleAgeChange = e => {
    setAge(e.target.value);
  };

  const resetProperties = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAge("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    const newUser = {
      id: user.id,
      first_name: firstName || user.first_name,
      last_name: lastName || user.last_name,
      email: email || user.email,
      age: parseInt(age) || user.age
    };
    const response = await api.put(`/users/${user.id}`, { ...newUser });
    newUser.created_at = response.data.created_at;
    newUser.updated_at = response.data.updated_at;
    const localUsers = JSON.parse(localStorage.getItem("users")).filter(
      u => u.id !== newUser.id
    );
    localUsers.push(newUser);
    await localStorage.setItem("users", JSON.stringify(localUsers));
    resetProperties();
    setUser(newUser);
    setLoading(false);
    setRedirect(true);
  };

  function redirectTo() {
    return <Redirect to="/" />;
  }

  useEffect(() => {
    async function getUser(id) {
      const response = await api.get(`/users/${id}`);
      setUser(response.data);
      setLoading(false);
    }
    const { id } = match.params;
    getUser(id);
  }, []);

  if (redirect) return redirectTo();

  return (
    <>
      {loading ? (
        <Loader>
          <FaSpinner color="#FFF" size={100} />
          <strong>Carregando</strong>
        </Loader>
      ) : (
        <>
          <Container>
            <h1>
              <FaPenSquare />
              Atualizar Usuário
              <Link to={`/details/${user.id}`}>Voltar aos detalhes</Link>
            </h1>

            <Form onSubmit={e => handleSubmit(e)}>
              <input
                type="text"
                placeholder="Nome"
                onChange={e => handleNameChange(e)}
                value={firstName}
              />
              <input
                type="text"
                placeholder="Sobrenome"
                onChange={e => handleLastNameChange(e)}
                value={lastName}
              />
              <input
                type="text"
                placeholder="Email"
                onChange={e => handleEmailChange(e)}
                value={email}
              />
              <input
                type="text"
                placeholder="Idade"
                onChange={e => handleAgeChange(e)}
                value={age}
              />
              <SubmitButton type="submit" loading={loading}>
                {loading ? (
                  <FaSpinner color="#FFF" size={14} />
                ) : (
                  "Atualizar Usuário"
                )}
              </SubmitButton>
            </Form>
          </Container>
        </>
      )}
    </>
  );
}

Update.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};
