/*
 * HostGamePage
 *
 * This is the first thing users see of our App, at the '/hostGame' route
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { shuffle } from 'lodash';

import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';

const GET_PLAYERS = gql`
    {
        users {
            num
            name
            role
        }
     }
    `;

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

const UPDATE_USER = gql`
  mutation{
    updateUser(
      data: {role: "狼人王"}
      where:{num: 8}
      )
  {
    id
    num
    name
    role
  }}
`;

const UPDATE_USER2 = gql`
  mutation ($update: UserUpdateInput!, $where: UserWhereUniqueInput!){
    updateUser(
      data: {role: $update}
      where: {num: $where}
    )
    {
      id
      num
      name
      role
    }
  }
`;

var roles = ["狼人","女巫","村民","獵人","預言家"];

export function HostGamePage({ onPlayerSelected }) {
  const [num, setNum] = useState(1);
  const [name, setName] = useState('');
  const [role, setRole] = useState('什麼都不是');
  const [upsertUser, { data2 }] = useMutation(UPSERT_USER, {
    variables: {
      where: { num },
      create: { num, name },
      update: { name }
    }
  });

  const [updateUser, { data3 }] = useMutation(UPDATE_USER);
  const [updateUser2, { data4 }] = useMutation(UPDATE_USER2, {
    variables: {
      data: { role },
      where: { num }
    }
  });

  const { loading, error, data } = useQuery(GET_PLAYERS);
  const status = 'Active';

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  var newRole = shuffle(roles);

  // Callback function for "Deal Role" button
  const dealRole = async () => {
    setNum(2);
    setRole("主持");
    //upsertUser();
    //updateUser();
    updateUser2();
  };

  // transform array to list format
  const listItem2 = newRole.map((newRoles) => <li>{newRoles}</li>);

  return (
    <div>
      <h1>You are the Game Host</h1>
      <ul name="player">
      {data ? data.users.map(player => (
        <li key={player.num} value={player.name}>
          {player.num} {player.name} {player.role}
        </li>
      )) : "No Data"}..
      </ul>
      <ul name="newplayer">
        {data2 ? data2.users.map(newplayer => (
          <li key={newplayer.num} value={newplayer.name}>
            {newplayer.num} {newplayer.name} {newplayer.role}
          </li>
        )) : "No Data2"}..
      </ul>
      <ul name="role2">
        {listItem2}
      </ul>
      <h2>Choose you role</h2>
      <h4><button type="button" onClick={dealRole}>
        Deal Role
      </button>
      </h4>
    </div>
  );
}

HostGamePage.propTypes = {
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

export default compose(withConnect)(HostGamePage);
