export default function InputBox(props) {
    return (
        <div>
            <input 
                type="text"
                onChange={ props.onChangePokemon }
            ></input>
        </div>
    )
};
