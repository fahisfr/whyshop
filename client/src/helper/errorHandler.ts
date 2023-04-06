interface ErrorResponse {
  message: string;
  status: number;
}

export const errorHandler = (error: any): ErrorResponse => {
  if (error?.response) {
    const response = error.response;
    const { message } = response.data;
    const status = response.status;
    return {
      message,
      status,
    };
  } else if (error?.request) {
    return {
      message: "Server not responding",
      status: 503,
    };
  } else {
    return {
      status: 400,
      message: "Oops! Something went wrong while setting up request",
    };
  }
};


export default errorHandler;
