import { useDispatch } from "react-redux";
import { showErrorMessage } from "../features/popUpMessage";
import { errorHandler } from "../helper/errorHandler";

export default function useErrorHandler() {
  const dispatch = useDispatch();

  return async (Fun: Function) => {
    try {
      Fun();
    } catch (error) {
      const message = errorHandler(error).message;
      dispatch(showErrorMessage(message));
    }
  };
}
