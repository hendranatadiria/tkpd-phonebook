import { MAX_CONTACT_PER_PAGE } from '@/config/consts';
import { colors } from '@/config/theme';
import { useAppDispatch, useAppSelector } from '@/redux'
import { setCurrentPage } from '@/redux/slices/phonebook';
import styled from '@emotion/styled';
import React, { useCallback, useMemo } from 'react'

const BtnPaginate = styled.button<{active?: boolean}>`
border: 1px solid #bdbdbd;
border-radius: 0.5rem;
padding: 0.5rem 0.75rem;
margin: 0.25rem;
cursor: pointer;
${props => props.active == true ? `
background-color: ${colors.primary};
color: #fff;
&:disabled {
  background-color: ${colors.primary};
  cursor: not-allowed;
}
` : 
  `background-color: #fff;
  &:hover {
    background-color: #eeeeee;
  }
  &:focus {
    outline: none;
  }
  &:disabled {
    background-color: #eeeeee;
    cursor: not-allowed;
  }`
}
`;

const PaginateBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

export default function PaginationButton() {
  const state = useAppSelector(state => state.phonebook)
  const dispatch = useAppDispatch();

  const TOTAL_PAGES = useMemo(() => Math.ceil(state.length / MAX_CONTACT_PER_PAGE), [state.length])

  const navToPage = useCallback((page: number) => {
    if (page < 1 || page > TOTAL_PAGES) return;
    dispatch(setCurrentPage(page));
  }
    , [TOTAL_PAGES, dispatch])


  return (
    <PaginateBar>
      <BtnPaginate key={'prev'} onClick={() => { navToPage(state.currentPage -1)}} disabled={state.currentPage === 1}>‹</BtnPaginate>
      {
        Array.from(Array(TOTAL_PAGES).keys()).map((page) => {
          return (
            <BtnPaginate
              key={page+1}
              onClick={() => { navToPage(page+1)}}
              disabled={state.currentPage === page+1}
              active={state.currentPage === page+1}
            >
              {page + 1}
            </BtnPaginate>
          )
        })
      }
      <BtnPaginate key={'next'} onClick={() => { navToPage(state.currentPage +1)}} disabled={state.currentPage === TOTAL_PAGES}>›</BtnPaginate>
    </PaginateBar>
  )
}
