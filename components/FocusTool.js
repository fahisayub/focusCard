import React, { useRef, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useFormStore } from './CollapsibleForm';
import PropTypes from 'prop-types';

// Styled components for focus tool layout
const FocusContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// CSS classes for focused and unfocused states
const focusedClass = 'focused';
const unfocusedClass = 'unfocused';

// Focus tool component
const FocusTool = ({ cardComponent: CardComponent, inputToCardMapping, inputRefs }) => {
  const { formData } = useFormStore();
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
        console.log(`Setting class for cardKey: ${cardKey}`);
        cardRefs.current[cardKey].classList.toggle(focusedClass, cardKey === inputToCardMapping[key]);
        cardRefs.current[cardKey].classList.toggle(unfocusedClass, cardKey !== inputToCardMapping[key]);
        console.log(`Class list for cardKey ${cardKey}:`, cardRefs.current[cardKey].classList);
      }
    });
  }, [inputToCardMapping]);

  const handleBlurEvent = useCallback(() => {
    console.log('handleBlurEvent triggered');
    Object.keys(cardRefs.current).forEach((cardKey) => {
      if (cardRefs.current[cardKey]) {
        console.log(`Resetting class for cardKey: ${cardKey}`);
        cardRefs.current[cardKey].classList.remove(focusedClass, unfocusedClass); // Reset classes on blur
        console.log(`Class list for cardKey ${cardKey} after reset:`, cardRefs.current[cardKey].classList);
      }
    });
  }, []);

  useEffect(() => {
    const currentInputRefs = inputRefs.current;
    const currentCardRefs = cardRefs.current;

    const focusHandlers = {};
    const blurHandlers = {};

    const addEventListeners = () => {
      Object.keys(inputToCardMapping).forEach((key) => {
        if (currentInputRefs[key] && currentCardRefs[inputToCardMapping[key]]) {
          console.log(`Adding event listeners for key: ${key}`);
          focusHandlers[key] = () => handleFocusEvent(key);
          blurHandlers[key] = () => handleBlurEvent();
          currentInputRefs[key].addEventListener('focus', focusHandlers[key]);
          currentInputRefs[key].addEventListener('blur', blurHandlers[key]);
        }
      });

      // Log the contents of inputRefs and cardRefs for debugging
      console.log('inputRefs:', inputRefs.current);
      console.log('cardRefs:', cardRefs.current);
      console.log('inputToCardMapping:', inputToCardMapping);
    };

    if (Object.keys(currentCardRefs).length === 0) {
      // Set up a mutation observer to wait for card elements to be added to the DOM
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.addedNodes.length > 0) {
            addEventListeners();
            observer.disconnect();
          }
        });
      });

      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      addEventListeners();
    }

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
  }, [formData, inputToCardMapping, handleFocusEvent, handleBlurEvent, inputRefs]);

  return (
    <FocusContainer>
      <CardComponent cardRefs={cardRefs} onCardClick={handleCardClick} />
    </FocusContainer>
  );
};

FocusTool.propTypes = {
  cardComponent: PropTypes.elementType.isRequired,
  inputToCardMapping: PropTypes.objectOf(PropTypes.string).isRequired,
  inputRefs: PropTypes.object.isRequired,
};

export default FocusTool;
