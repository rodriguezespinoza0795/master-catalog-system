const cognitoErrors = {
  UserNotFoundException: {
    title: "User not found",
    description: "Please check your email and try again.",
  },
  NotAuthorizedException: {
    title: "Incorrect credentials",
    description: "Email or password is incorrect.",
  },
  UserNotConfirmedException: {
    title: "Account not verified",
    description: "Check your email to verify your account.",
  },
  UsernameExistsException: {
    title: "Account already exists",
    description:
      "An account with this email already exists. Try logging in instead.",
  },
  CodeMismatchException: {
    title: "Invalid verification code",
    description: "The code you entered is incorrect. Please try again.",
  },
};

const getCognitoError = (error: string) => {
  if (error in cognitoErrors) {
    return cognitoErrors[error as keyof typeof cognitoErrors];
  }
  return {
    title: "Something went wrong",
    description: "Please try again later.",
  };
};

export default getCognitoError;
