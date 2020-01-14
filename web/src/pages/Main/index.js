import React, { useState, useEffect } from 'react';

import { FaUser, FaSpinner } from 'react-icons/fa';

import { Container, Form, SubmitButton, List, EmptyUsers } from './styles';

import api from '../../services/api';

const Main = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

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
    setLoading(true);
    const user = {
      first_name: firstName,
      last_name: lastName,
      email,
      age: parseInt(age),
    };
    const response = await api.post('/users', { ...user });
    user.id = response.data.id;
    setUsers([...users, user]);
    await localStorage.setItem('users', JSON.stringify([...users, user]));
    resetProperties();
    setLoading(false);
  };

  useEffect(() => {
    async function getAllUsers() {
      const resp = await api.get('users');
      setUsers([...resp.data]);
      await localStorage.setItem('users', JSON.stringify(resp.data));
    }
    const localUsers = localStorage.getItem('users');
    if (localUsers) {
      setUsers(JSON.parse(localUsers));
    } else {
      getAllUsers();
    }
  }, []);

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
        <SubmitButton type="submit" loading={loading}>
          {loading ? <FaSpinner color="#FFF" size={14} /> : 'Adicionar Usuário'}
        </SubmitButton>
      </Form>
      {users ? (
        <List>
          {users.map(user => (
            <li key={user.id}>
              <span>{`${user.first_name} ${user.last_name}`}</span>
              <a href="">Detalhes</a>
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
