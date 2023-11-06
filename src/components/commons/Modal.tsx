import React, { useEffect, useRef, useState } from 'react'
import { Card, IconButton } from '.';
import styled from '@emotion/styled';
import { CloseOutlined } from '@ant-design/icons';

const ModalContainer= styled.dialog`
    background: transparent;
    outline: none;
    min-width: 80vw;
    &::backdrop {
        background-color: rgba(0,0,0,0.7);
    }
`;

const FlexCloseBtn = styled(IconButton)`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-left: auto;
`;

export default function Modal({ isOpen, hasCloseBtn, onClose, children }: {isOpen: boolean, hasCloseBtn: boolean, onClose: () => void, children: React.ReactNode}) {
    const [isModalOpen, setModalOpen] = useState(isOpen);
    const modalRef = useRef<HTMLDialogElement | null>(null);

    const handleCloseModal = () => {
        if (onClose) {
          onClose();
        }
        setModalOpen(false);
      };

      const handleKeyDown = (event: React.KeyboardEvent<HTMLDialogElement>) => {
        if (event.key === "Escape") {
          handleCloseModal();
        }
      };

      useEffect(() => {
        const modalElement = modalRef.current;
        if (modalElement) {
          if (isModalOpen) {
            modalElement.showModal();
          } else {
            modalElement.close();
          }
        }
      }, [isModalOpen]);

      useEffect(() => {
        setModalOpen(isOpen);
      }, [isOpen]);


    return (
        <ModalContainer ref={modalRef} onKeyDown={handleKeyDown}>
            <Card>
            {hasCloseBtn && (
                <FlexCloseBtn onClick={handleCloseModal}>
                    <CloseOutlined />
                    Close
                </FlexCloseBtn>
            )}
            {children}
          </Card>
        </ModalContainer>
      );
}
