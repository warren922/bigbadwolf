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

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const GET_PLAYERS = gql`
    {
        users {
            num
            name
            role
        }
     }
    `;


export default function HostGamePage({ onPlayerSelected }) {
  const { loading, error, data } = useQuery(GET_PLAYERS);
  const status = 'Active';

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <h1>You are the Game Host</h1>
      <ul name="player">
      {data.users.map(player => (
        <li key={player.num} value={player.name}>
          {player.num} {player.name} {player.role}
        </li>
      ))}
    </ul>
      <h2>Choose you role</h2>
    <select name="player" onChange={onPlayerSelected}>
      {data.users.map(player => (
        <option key={player.num} value={player.name}>
          {player.num} {player.name} {player.role}
        </option>
      ))}
    </select>
    </div>
  );
}
