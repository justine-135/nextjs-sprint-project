import useLoading from "./useLoading";

interface IUseSubmitProps<T> {
  trigger?: (payload: T) => Promise<T>;
  successMessage?: string;
  failedMessage?: string;
}

export const useSubmit = <T>({
  trigger,
  successMessage,
  failedMessage,
}: IUseSubmitProps<T>) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  return { isLoading };
};
