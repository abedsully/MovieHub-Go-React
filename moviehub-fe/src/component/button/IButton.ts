interface IButton {
    label: string;
    onClick?: (email: string, password: string) => void;
  }
  
  export default IButton;