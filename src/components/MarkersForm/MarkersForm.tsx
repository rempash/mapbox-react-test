import { Button, TextField, Box } from "@mui/material";
import { useState } from "react";

import { Marker } from "../../interfaces/Marker.interface";
import { MarkersModalMode } from "../../store/slices/markersModal/markersModal.slice";
import { useSetOnChange } from "./hooks/useSetOnChange.hook";

export type MarkerUserInput = Pick<Marker, "name" | "description">;

interface MarkersFormProps {
    onCancel: () => void,
    mode: MarkersModalMode,
    initialState: MarkerUserInput,
    onSubmit: (formState: MarkerUserInput) => void,
};

export const MarkersForm: React.FC<MarkersFormProps> = ({
    onCancel = () => '',
    onSubmit,
    mode,
    initialState
}) => {

    const [name, setName] = useState(initialState.name);
    const [description, setDescription] = useState(initialState.description);

    const onChangeMarkerName = useSetOnChange(setName);
    const onChangeMarkerDescription = useSetOnChange(setDescription);

    const onFormSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onSubmit({
            name,
            description
        });
    }

    return (
        <form
            onSubmit={onFormSubmit}
        >
            <TextField
                label="Marker name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={onChangeMarkerName}
                sx={{ mt: 1 }}
            />
            <TextField
                label="Marker description"
                fullWidth
                multiline
                margin="normal"
                maxRows={4}
                value={description}
                onChange={onChangeMarkerDescription}
                sx={{ mt: 2, mb: 3 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                    variant="outlined"
                    color="error"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    type="submit" 
                    variant="contained"
                    color="success"
                    sx={{ ml: 2 }}
                >
                    { mode === MarkersModalMode.CREATE ? 'Save' : 'Update' }
                </Button>
            </Box>
      </form>
    )
};
