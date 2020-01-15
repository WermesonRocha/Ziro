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

export default function Details({ match }) {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser(id) {
      const response = await api.get(`/users/${id}`);
      setUser(response.data);
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
          <User>
            <Link to="/">Voltar aos Usuários</Link>
            <img
              src="http://cdn.miscellaneoushi.com/1920x1080/20180518/5afe20fd23f6f.jpg"
              alt={`${user.first_name}`}
            />
            <h1>{`${user.first_name} ${user.last_name}`}</h1>
            <h2>{user.email}</h2>
            <h3>
              {`Criado em: ${format(
                user.created_at,
                "dd 'de' MMMM', às' H:mm'h'",
                { locale: pt }
              )}`}
            </h3>
            <h3>
              {`Atualizado em: ${format(
                user.updated_at,
                "dd 'de' MMMM', às' H:mm'h'",
                { locale: pt }
              )}`}
            </h3>
            <Link to={`/update/${user.id}`} user={user}>
              Atualizar Informações
            </Link>
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
