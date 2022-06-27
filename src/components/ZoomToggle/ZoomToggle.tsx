
import Switch from '@mui/material/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { enabledZoomSelector, toggleEnableZoom } from '../../store/slices/enableZoom/enableZoom.slice';
import { ZoomEnabledNote } from './styled/zoomEnabledNote.styled';

import { ZoomToggleContainer } from "./styled/ZoomToggleContainer.styled";

export const ZoomToggle = () => {

    const enabledZoom = useSelector(enabledZoomSelector);

    const dispatch = useDispatch();

    const onSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(toggleEnableZoom(!enabledZoom))
    };

    return (
        <ZoomToggleContainer>
            <div>Enable zoom on double click</div>
            <Switch
                checked={enabledZoom}
                onChange={onSwitchChange}
            />
            {enabledZoom && (
                <ZoomEnabledNote>Note: You can only create markers if zoom disabled</ZoomEnabledNote>
            )}
        </ZoomToggleContainer>
    );
};
