import React, { useState } from 'react';

import { FaUser } from 'react-icons/fa';

import { Container, Form, SubmitButton } from './styles';

const Main = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

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
    setFirstName('');
    setLastName('');
    setEmail('');
    setAge('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    alert('Submmited !')
    resetProperties();
  };

  return (
    <Container>
      <h1>
        <FaUser />
        Usuários
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
        <SubmitButton type="submit">
          Adicionar Usuário
        </SubmitButton>
      </Form>
    </Container>
  );
};

export default Main;
