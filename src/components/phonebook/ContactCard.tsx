import React, { HTMLAttributes, useMemo } from 'react'
import { Card, CardSubtitle, CardTitle, IconButton } from '../commons'
import { DeleteFilled, EditFilled, StarOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/redux';

interface IContactCard extends HTMLAttributes<HTMLDivElement> {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    onFavPressed?: () => any;
    onDelPressed?: () => any;
}
export default function ContactCard(props:IContactCard) {
    const {firstName, lastName, phoneNumber, onFavPressed, onDelPressed, ...otherProps} = props;

  return (
    <Card {...otherProps}>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div>
            <CardTitle>{firstName}{lastName && ` ${lastName}`}</CardTitle>
            <CardSubtitle>{phoneNumber}</CardSubtitle>
          </div>
          <div style={{display: 'flex', gap: '0.75rem'}}>
            {/* <IconButton><EditFilled /></IconButton> */}
            <IconButton onClick={(e) => {
              e.stopPropagation();
              if (onFavPressed !== undefined) {
                onFavPressed();
              }
              }}><StarOutlined /></IconButton>
            <IconButton onClick={(e) => {
              e.stopPropagation();
              if (onDelPressed !== undefined) {
                onDelPressed();
              }
              }}><DeleteFilled /></IconButton>
          </div>
        </div>
        </Card>
  )
}
