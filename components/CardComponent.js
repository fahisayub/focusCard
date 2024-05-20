import React from 'react';
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
const CardComponent = () => {
  const { formData } = useFormStore();

  return (
    <CardContainer>
      <CardSection>
        <CardText>{formData.textInput || 'Default Text'}</CardText>
      </CardSection>
      <CardSection>
        {formData.fileInput ? (
          <CardImage src={URL.createObjectURL(formData.fileInput)} alt="Uploaded" />
        ) : (
          <CardImage src="https://via.placeholder.com/100" alt="Placeholder" />
        )}
      </CardSection>
      <CardSection>
        <CardText>{formData.selectInput || 'Default Option'}</CardText>
      </CardSection>
    </CardContainer>
  );
};

export default CardComponent;
