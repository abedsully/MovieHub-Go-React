interface ITextInput {
    label: string;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
}

export default ITextInput