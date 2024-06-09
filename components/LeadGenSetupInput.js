import React, { forwardRef, useEffect, useState } from "react";
import { Input, Textarea, Grid, Button, Divider } from "@nextui-org/react";
import { IconTrash } from "@tabler/icons";
import useAppStore from "@/store";

const LeadGenSetupInput = forwardRef(({ data, label }, ref) => {
    const [cellData, setCellData] = useState(data);
    const [type, setType] = useState(data.type);
    const inputs = useAppStore(({ cardData }) => cardData);
    const setInputs = useAppStore(({ setInitCard }) => setInitCard);

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        let updatedData = { ...cellData, body: value };
        setCellData(updatedData);

        let updatedInputs = inputs.leadFormModule.map((item) =>
            item.id === name ? { ...item, body: value } : item
        );
        setInputs({ ...inputs, leadFormModule: updatedInputs });
    };

    const handleRemoveRow = (id) => {
        let curRows = inputs.leadFormModule;
        let rows = curRows.filter((row) => row.id !== `${id}`);
        setInputs({ ...inputs, leadFormModule: rows });
    };

    useEffect(() => {
        setCellData(data);
        setType(data.type);
    }, [data]);

    return (
        <div style={{ width: '100%' }}>
            <Grid css={{ display: 'flex', width: '100%', alignItems: 'center' }}>
                {cellData.type !== 'text' && cellData.type !== 'header' ? (
                    <Input
                        value={cellData.body}
                        name={cellData.label}
                        label={cellData.label}
                        size={'md'}
                        onChange={onChangeHandler}
                        placeholder=""
                        contentLeftStyling={true}
                        contentEditable={true}
                        contentClickable={true}
                        contentRight={
                            <Button
                                auto
                                light
                                color={'error'}
                                size={'xs'}
                                css={{ margin: '0 -10px', dflex: 'center', cursor: 'pointer' }}
                                onClick={() => handleRemoveRow(data.id)}
                            >
                                <IconTrash size={15} />
                            </Button>
                        }
                        css={{ mb: "10px", pb: "0px", width: '100%', "::placeholder": { color: '#94A3B8' } }}
                    />
                ) : (
                    <div style={{ position: 'relative', width: '100%' }}>
                        <Button
                            auto
                            light
                            color={'error'}
                            size={'xs'}
                            css={{ margin: '0 5px', right: '0px', top: '40px', dflex: 'center', cursor: 'pointer', position: 'absolute', zIndex: 10 }}
                            onClick={() => handleRemoveRow(data.id)}
                        >
                            <IconTrash size={15} />
                        </Button>
                        <Textarea
                            value={cellData.body}
                            name={cellData.label}
                            label={cellData.label}
                            size={'md'}
                            onChange={onChangeHandler}
                            placeholder=""
                            css={{ mb: "10px", pb: "0px", width: '100%', "::placeholder": { color: '#94A3B8' } }}
                        />
                    </div>
                )}
            </Grid>
            <Divider />
        </div>
    );
});

export default LeadGenSetupInput;
