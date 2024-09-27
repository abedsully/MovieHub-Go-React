interface IAlertModal {
    open: boolean;
    setOpen: (open: boolean) => void;
    title: string;
    message: string;
    buttonTitle?: string
    onClick?: () => void;
    success?: boolean;
  }
  
  export default IAlertModal;