import React from 'react';
import { Collapse } from '@nextui-org/react';
import styled from 'styled-components';
import { create } from 'zustand';

// Zustand store for form state management
export const useFormStore = create((set) => ({
  formData: {},
  setFormData: (key, value) => set((state) => ({
    formData: { ...state.formData, [key]: value },
  })),
}));

// Styled components for form layout
const FormContainer = styled.div`
  padding: 20px;
`;

const FormSection = styled.div`
  margin-bottom: 20px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

// Collapsible form component
const CollapsibleForm = ({ inputRefs }) => {
  const { formData, setFormData } = useFormStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(name, value);
  };

  return (
    <FormContainer>
      <Collapse.Group>
        <Collapse title="Section 1">
          <FormSection>
            <label>Text Input:</label>
            <FormInput
              type="text"
              name="textInput"
              value={formData.textInput || ''}
              onChange={handleInputChange}
              ref={(el) => (inputRefs.current.textInput = el)}
            />
          </FormSection>
        </Collapse>
        <Collapse title="Section 2">
          <FormSection>
            <label>File Input:</label>
            <FormInput
              type="file"
              name="fileInput"
              onChange={handleInputChange}
              ref={(el) => (inputRefs.current.fileInput = el)}
            />
          </FormSection>
        </Collapse>
        <Collapse title="Section 3">
          <FormSection>
            <label>Select Input:</label>
            <FormSelect
              name="selectInput"
              value={formData.selectInput || ''}
              onChange={handleInputChange}
              ref={(el) => (inputRefs.current.selectInput = el)}
            >
              <option value="">Select an option</option>
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
            </FormSelect>
          </FormSection>
        </Collapse>
      </Collapse.Group>
    </FormContainer>
  );
};

export default CollapsibleForm;
