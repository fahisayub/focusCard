import React from 'react';
import { Collapse } from '@nextui-org/react';
import styled from 'styled-components';
import { create } from 'zustand';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

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

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(formData.leadFormModule);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormData('leadFormModule', items);
  };

  return (
    <FormContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="formSections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <Collapse.Group>
                {formData.leadFormModule?.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Collapse title={`Section ${index + 1}`}>
                          <FormSection>
                            <label>{item.label}:</label>
                            {item.type === 'text' && (
                              <FormInput
                                type="text"
                                name={item.id}
                                value={item.body || ''}
                                onChange={handleInputChange}
                                ref={(el) => {
                                  inputRefs.current[item.id] = el;
                                }}
                              />
                            )}
                            {item.type === 'file' && (
                              <FormInput
                                type="file"
                                name={item.id}
                                onChange={handleInputChange}
                                ref={(el) => {
                                  inputRefs.current[item.id] = el;
                                }}
                              />
                            )}
                            {item.type === 'select' && (
                              <FormSelect
                                name={item.id}
                                value={item.body || ''}
                                onChange={handleInputChange}
                                ref={(el) => {
                                  inputRefs.current[item.id] = el;
                                }}
                              >
                                <option value="">Select an option</option>
                                <option value="option1">Option 1</option>
                                <option value="option2">Option 2</option>
                              </FormSelect>
                            )}
                          </FormSection>
                        </Collapse>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Collapse.Group>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </FormContainer>
  );
};

export default CollapsibleForm;
