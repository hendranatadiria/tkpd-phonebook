import { GET_PHONEBOOK } from '@/services/phonebook';
import { useQuery } from '@apollo/client/react';
import styled from '@emotion/styled';
import React from 'react'

const FavoriteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 500;
  color: #999;
  letter-spacing: 0.1rem;
`;

export default function FavoriteList() {
  return (
    <>
    <FavoriteHeader>Favorites</FavoriteHeader>
    <div>FavoriteList</div>
    </>
  )
}
