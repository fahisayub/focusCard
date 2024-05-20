import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useFormStore } from './CollapsibleForm';

// Styled components for card layout
const CardContainer = styled.div`
  width: 300px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardSection = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const CardImage = styled.img`
  width: 100px;
  height: auto; /* Maintain aspect ratio */
  object-fit: cover;
  border-radius: 10px;
`;

const CardText = styled.div`
  flex: 1;
  margin-left: 10px;
`;

// Card component
const CardComponent = ({ cardRefs, onCardClick }) => {
  const { formData } = useFormStore();

  // Create references for each card element
  const textDivRef = useRef(null);
  const fileDivRef = useRef(null);
  const selectDivRef = useRef(null);

  // Populate cardRefs with the references
  useEffect(() => {
    cardRefs.current = {
      textDiv: textDivRef.current,
      fileDiv: fileDivRef.current,
      selectDiv: selectDivRef.current,
    };
    console.log('cardRefs populated:', cardRefs.current); // Debugging log
  }, [cardRefs]);

  // Additional log statements for debugging
  useEffect(() => {
    console.log('CardComponent mounted');
    return () => {
      console.log('CardComponent unmounted');
    };
  }, []);

  useEffect(() => {
    console.log('textDivRef:', textDivRef.current);
    console.log('fileDivRef:', fileDivRef.current);
    console.log('selectDivRef:', selectDivRef.current);
  }, [textDivRef, fileDivRef, selectDivRef]);

  return (
    <CardContainer>
      <CardSection ref={textDivRef} onClick={() => onCardClick('textInput')}>
        <CardText>{formData.textInput || 'Default Text'}</CardText>
      </CardSection>
      <CardSection ref={fileDivRef} onClick={() => onCardClick('fileInput')}>
        {formData.fileInput ? (
          <CardImage src={URL.createObjectURL(formData.fileInput)} alt="Uploaded" />
        ) : (
          <CardImage src="https://via.placeholder.com/100" alt="Placeholder" />
        )}
      </CardSection>
      <CardSection ref={selectDivRef} onClick={() => onCardClick('selectInput')}>
        <CardText>{formData.selectInput || 'Default Option'}</CardText>
      </CardSection>
    </CardContainer>
  );
};

export default CardComponent;
