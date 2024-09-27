import { useState } from "react";
import TextInput from "../../component/text-input/TextInput";
import Button from "../../component/button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiMovieHub } from "../../constant/Api";
import AlertModal from "../../component/alert-modal/AlertModal";
import logo from "../../assets/logo.png"

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalButtonTitle, setModalButtonTitle] = useState<string>("");
  const [modalButtonSuccess, setModalButtonSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleRegisterClick = async () => {
    try {
      if (!email || !password || !username) {
        setModalTitle("Missing Fields");
        setModalMessage("Please enter all of the required fields!");
        setIsModalOpen(true);
        setModalButtonSuccess(false);
        return;
      }

      const response = await axios.post(ApiMovieHub.register, {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        setModalTitle("Register Success");
        setModalMessage("Press the button to redirect you to the login page.");
        setModalButtonTitle("Go to Login");
        setModalButtonSuccess(true);
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalTitle("Error");
      setModalMessage("An error occurred. Please try again later.");
      setIsModalOpen(true);
      setModalButtonSuccess(false);
    }
  };

  const handleModalButtonClick = () => {
    setIsModalOpen(false);

    if (modalButtonSuccess) {
      navigate("/login");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={logo} className="mx-auto h-32 w-32" />
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            <TextInput
              label={"Username"}
              placeholder={"Enter username"}
              value={username}
              onChange={handleUsernameChange}
            />

            <TextInput
              label={"Email Address"}
              placeholder={"Enter email address"}
              value={email}
              onChange={handleEmailChange}
            />

            <TextInput
              label={"Password"}
              placeholder={"Enter password"}
              value={password}
              type={"password"}
              onChange={handlePasswordChange}
            />

            <div>
              <Button label="Register" onClick={handleRegisterClick} />
            </div>

            <p className="mt-4 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login!
              </Link>
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AlertModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          title={modalTitle}
          message={modalMessage}
          buttonTitle={modalButtonTitle}
          onClick={handleModalButtonClick}
          success={modalButtonSuccess}
        />
      )}
    </>
  );
};

export default Register;
