import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';

import { MarkersForm } from '..';
import { MarkerStoreContext } from '../../features/MarkersStore';
import { addMarker, removeMarker, updateMarker } from '../../store/slices/markers/markers.slice';
import { emptyMarker, MarkersModalMode, markersModalSelector, toggleMarkersModal } from '../../store/slices/markersModal/markersModal.slice';
import { MarkerUserInput } from '../MarkersForm/MarkersForm';
import { MarkerModalBox } from './styled/MarkerModalBox.styled';

export const MarkersModal = () => {

    const {
        isOpen,
        marker: {
            markerId,
            name,
            description,
        },
        mode,
    } = useSelector(markersModalSelector);

    const isCreateMode = mode === MarkersModalMode.CREATE;

    const dispatch = useDispatch();
    const MarkerStore = useContext(MarkerStoreContext);

    const hideModal = () => dispatch(toggleMarkersModal({ marker: emptyMarker }));

    const removeMarkerFromMap = () => {
        const markerInstance = MarkerStore.getMarker(markerId);
        markerInstance.remove();
        MarkerStore.removeMarkerLink(markerId);
    };

    const handleClose = () => {
        hideModal();
        if (isCreateMode) {
            removeMarkerFromMap();
        }
    };

    const onSubmit = ({ name, description }: MarkerUserInput) => {
        hideModal();

        const action = isCreateMode
            ? addMarker
            : updateMarker;

        dispatch(action({
            markerId,
            name,
            description,
        }));
    };

    const onDelete = () => {
        dispatch(removeMarker(markerId));
        hideModal();
        removeMarkerFromMap();
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
        >
            <MarkerModalBox>
                {!isCreateMode && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <IconButton onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                )}
                <MarkersForm
                    mode={mode}
                    onCancel={handleClose}
                    initialState={{
                        name,
                        description,
                    }}
                    onSubmit={onSubmit}
                ></MarkersForm>
            </MarkerModalBox>
        </Modal>
    );
};
