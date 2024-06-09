import { Button, Dropdown, Text, Tooltip } from "@nextui-org/react";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { CollapseFormCard, FormCard } from "./CommonFormElements";
import { useIsMobile } from "@/hooks/useMediaQuery";
import { passInputProps } from "@/interfaces/CardInterface";
import useAppStore from "@/store";
import { CONSTS } from "@/constants";
import LeadGenSetupInput from "./LeadGenSetupInput";
import ZoomOnHover from "../ZoomOnHover/ZoomOnHover";
import { IconCursorText, IconHeading, IconPictureInPictureOff, IconTextCaption } from "@tabler/icons";
import { useRouter } from "next/navigation";
import GeneratedLeadModal from "../GeneratedLeadModal/GeneratedLeadModal";

const FormElements = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const LeadGenSetupCollapse = forwardRef(({ setIsFlipped, isFlipped }, inputRefs) => {
    const gridRef = useRef(null);
    const [isTableExpand, setExpandTable] = useState(false);
    const inputs: passInputProps = useAppStore(({ cardData }) => cardData as passInputProps);
    const setInputs = useAppStore(({ setInitCard }) => setInitCard as (data: passInputProps) => Promise<any>);
    const initialRows = inputs?.leadFormModule?.length || 0;
    const [numRows, setNumRows] = useState(initialRows);
    const isMobile = useIsMobile();
    const router = useRouter();

    const handleAddRow = (e) => {
        const num = numRows + 1;
        let rows = inputs.leadFormModule || [];
        rows.push({ id: `r${num}`, body: "", label: e.currentKey, type: e.currentKey });

        setInputs({ ...inputs, leadFormModule: rows });
        setNumRows(num);
    };

    const handleRemoveRow = (id) => {
        let curRows = inputs.leadFormModule;
        let rows = curRows.filter((row) => row.id !== `${id}`);

        setInputs({ ...inputs, leadFormModule: rows });
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(inputs.leadFormModule);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setInputs({ ...inputs, leadFormModule: items });
    };

    useEffect(() => {}, [inputs?.leadFormModule?.length]);

    return (
        <CollapseFormCard>
            <FormElements style={{ flexDirection: 'column', gap: isMobile ? '10px' : "10px", width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <div></div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                        <Tooltip id="expand" color={'invert'} content="View leads generated">
                            <Button light auto size={"sm"} onClick={() => { setExpandTable(true) }}>View submissions</Button>
                        </Tooltip>
                        |
                        <Tooltip id="expand" color={'invert'} content="Buy more credits">
                            <Button light auto size={"sm"} onClick={() => { router.push('/pricing') }}> {`${10 - Number(inputs?.generatedLeads?.length) || 10} free leads remaining`} </Button>
                        </Tooltip>
                    </div>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="formSections">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                {inputs.leadFormModule ? inputs.leadFormModule.map((row, index) => (
                                    <Draggable key={row.id} draggableId={row.id} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <LeadGenSetupInput
                                                    key={row.id}
                                                    data={row}
                                                    ref={inputRefs}
                                                    label={row.id}
                                                />
                                            </div>
                                        )}
                                    </Draggable>
                                )) : <></>}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </FormElements>
        </CollapseFormCard>
    );
});

export default LeadGenSetupCollapse;
