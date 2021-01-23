import { TextField } from '@material-ui/core';

export default function InputBox(props) {
    return (
        <div>
            <TextField fullWidth label="Filled" variant="filled" onChange={ props.onChangePokemon }/>
        </div>
    )
};
