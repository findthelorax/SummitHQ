import { TextField } from '@mui/material';
import { incidentFormStyles } from '../../theme/theme';

const IncidentField = ({ newRow, setNewRow, handleInputChange }) => {
    return (
        <TextField
            name="incident"
            value={newRow.incident}
            onChange={(e) => {
                handleInputChange(e);
                setNewRow((prevState) => ({
                    ...prevState,
                    incident: e.target.value,
                }));
            }}
            placeholder="Incident"
            variant="outlined"
            sx={incidentFormStyles}
        />
    );
};

export default IncidentField;