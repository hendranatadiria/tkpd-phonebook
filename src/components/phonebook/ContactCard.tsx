import React, { HTMLAttributes } from 'react'
import { Card, CardSubtitle, CardTitle } from '../commons'

interface IContactCard extends HTMLAttributes<HTMLDivElement> {
    firstName: string;
    lastName: string;
    phoneNumber: string;
}
export default function ContactCard(props:IContactCard) {
    const {firstName, lastName, phoneNumber, ...otherProps} = props;
  return (
    <Card {...otherProps}>
        <CardTitle>{firstName}{lastName && ` ${lastName}`}</CardTitle>
        <CardSubtitle>{phoneNumber}</CardSubtitle>
        </Card>
  )
}
