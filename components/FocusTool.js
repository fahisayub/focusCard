import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useFormStore } from './CollapsibleForm';
import CollapsibleForm from './CollapsibleForm';
import PropTypes from 'prop-types';

// Styled components for focus tool layout
const FocusContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Focus tool component
const FocusTool = ({ cardComponent: CardComponent, inputToCardMapping }) => {
  const { formData } = useFormStore();
  const inputRefs = useRef({});
  const cardRefs = useRef({});

  const handleFocus = (key) => {
    if (inputRefs.current[key]) {
      inputRefs.current[key].focus();
      inputRefs.current[key].scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCardClick = (key) => {
    handleFocus(key);
  };

  const handleFocusEvent = useCallback((key) => {
    console.log(`handleFocusEvent triggered for key: ${key}`);
    Object.keys(cardRefs.current).forEach((cardKey) => {
      if (cardRefs.current[cardKey]) {
        console.log(`Setting opacity for cardKey: ${cardKey}`);
        cardRefs.current[cardKey].style.opacity = cardKey === inputToCardMapping[key] ? 1 : 0.5;
      }
    });
  }, [inputToCardMapping]);

  const handleBlurEvent = useCallback(() => {
    console.log('handleBlurEvent triggered');
    Object.keys(cardRefs.current).forEach((cardKey) => {
      if (cardRefs.current[cardKey]) {
        console.log(`Resetting opacity for cardKey: ${cardKey}`);
        cardRefs.current[cardKey].style.opacity = 1; // Reset opacity to normal on blur
      }
    });
  }, []);

  useEffect(() => {
    const currentInputRefs = inputRefs.current;
    const currentCardRefs = cardRefs.current;

    const focusHandlers = {};
    const blurHandlers = {};

    Object.keys(inputToCardMapping).forEach((key) => {
      if (currentInputRefs[key] && currentCardRefs[inputToCardMapping[key]]) {
        console.log(`Adding event listeners for key: ${key}`);
        focusHandlers[key] = () => handleFocusEvent(key);
        blurHandlers[key] = () => handleBlurEvent();
        currentInputRefs[key].addEventListener('focus', focusHandlers[key]);
        currentInputRefs[key].addEventListener('blur', blurHandlers[key]);
      }
    });

    // Cleanup event listeners on component unmount
    return () => {
      Object.keys(inputToCardMapping).forEach((key) => {
        if (currentInputRefs[key] && currentCardRefs[inputToCardMapping[key]]) {
          console.log(`Removing event listeners for key: ${key}`);
          currentInputRefs[key].removeEventListener('focus', focusHandlers[key]);
          currentInputRefs[key].removeEventListener('blur', blurHandlers[key]);
        }
      });
    };
  }, [formData, inputToCardMapping, handleFocusEvent, handleBlurEvent]);

  return (
    <FocusContainer>
      <CollapsibleForm inputRefs={inputRefs} />
      <CardComponent cardRefs={cardRefs} onCardClick={handleCardClick} />
    </FocusContainer>
  );
};

FocusTool.propTypes = {
  cardComponent: PropTypes.elementType.isRequired,
  inputToCardMapping: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FocusTool;
