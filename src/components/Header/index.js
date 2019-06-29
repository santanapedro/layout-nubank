/* eslint-disable react/prop-types */
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container, Top, Title, SubHeader,
} from './styles';


export default function Header({ server, user }) {
  return (
    <Container>
      <Top>
        <Title>{server}</Title>
        <SubHeader> {user} </SubHeader>
      </Top>
      <Icon name="keyboard-arrow-down" size={20} color="#FFF" />
    </Container>
  );
}
