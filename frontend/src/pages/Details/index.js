import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import PropTypes from "prop-types";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import api from "../../services/api";

import Container from "../../components/Container";
import Loader from "../../components/Loader";
import { User } from "./styles.js";

import InvalidMessage from "../../components/InvalidMessage";

export default function Details({ match }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function getUser(id) {
      const response = await api.get(`/users/${id}`);
      if (response.data) {
        setUser(response.data);
      } else {
        setErrors({
          ...errors,
          load:
            "Não foi possível carregar as informações do usuário. Verifique a existência do mesmo e tente novamente."
        });
      }
      setLoading(false);
    }
    const { id } = match.params;
    getUser(id);
  }, []);

  return (
    <>
      {loading ? (
        <Loader>
          <FaSpinner color="#FFF" size={100} />
          <strong>Carregando</strong>
        </Loader>
      ) : (
        <Container>
          {errors.load && <InvalidMessage>{errors.load}</InvalidMessage>}
          <User>
            <Link to="/">Voltar aos Usuários</Link>
            <h1>
              {user.first_name && user.last_name
                ? `${user.first_name} ${user.last_name}`
                : ""}
            </h1>
            <h2>{user.email ? user.email : ""}</h2>
            <h3>
              {user.created_at
                ? `Criado em: ${format(
                    user.created_at,
                    "dd 'de' MMMM', às' H:mm'h'",
                    { locale: pt }
                  )}`
                : ""}
            </h3>
            <h3>
              {user.updated_at
                ? `Atualizado em: ${format(
                    user.updated_at,
                    "dd 'de' MMMM', às' H:mm'h'",
                    { locale: pt }
                  )}`
                : ""}
            </h3>
            {user.first_name && (
              <Link to={`/update/${user.id}`} user={user}>
                Atualizar Informações
              </Link>
            )}
          </User>
        </Container>
      )}
    </>
  );
}

Details.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
};
