/**
 *
 * JoinGamePage
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const UPSERT_USER = gql`
  mutation ($where: UserWhereUniqueInput!, $create: UserCreateInput!, $update: UserUpdateInput!) {
    upsertUser(
      where: $where
      create: $create
      update: $update
    ) {
      id
      num
      name
      role
    }
  }
`;

export function JoinGamePage() {
  const [num, setNum] = useState(1);
  const [name, setName] = useState('');
  const [upsertUser, { data }] = useMutation(UPSERT_USER, {
    variables: {
      where: { num },
      create: { num, name },
      update: { name }
    }
  });

  const joinGame = async () => {
    upsertUser();
  };

  return (
    <div>
      Join Game<br />
      Num: <input name="num" onChange={e => setNum(parseInt(e.currentTarget.value))} /><br />
      Name: <input name="name" onChange={e => setName(e.currentTarget.value)} /><br />
      Role: {data && data.upsertUser.role ? data.upsertUser.role : "No Role Yet"}<br />
      <button type="button" onClick={joinGame}>
        Join
      </button>
    </div>
  );
}

JoinGamePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(JoinGamePage);
