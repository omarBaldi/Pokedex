import { TextField } from '@material-ui/core';
import { Box } from '@material-ui/core';

export default function InputBox(props) {
    return (
        <Box mb={5}>
            <TextField 
                fullWidth 
                placeholder="Search pokemon..." 
                variant="outlined" 
                onChange={ props.onChangePokemon }
            />
        </Box>
    )
};
