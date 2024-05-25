import { useToast } from "@/components/ui/use-toast";
import useLoading from "./useLoading";

interface IUseSubmitProps<T, R> {
  trigger?: (payload: T) => Promise<R>;
  successMessage?: string;
  failedMessage?: string;
  onSuccess?: () => void;
}

export interface SubmitResponse<T extends object> {
  success?: boolean;
}

export const useSubmit = <T extends object, R>({
  trigger,
  successMessage,
  failedMessage,
  onSuccess,
}: IUseSubmitProps<T, R>) => {
  const { isLoading, startLoading, stopLoading } = useLoading();

  const { toast } = useToast();

  const handleSubmitSuccess = () => {
    onSuccess?.();
    return toast({
      title: "Success",
      description: successMessage,
    });
  };

  const handleSubmitError = () => {
    return toast({
      variant: "destructive",
      title: "Something went wrong!",
      description: "Your request is not submitted.",
    });
  };

  const onFinish = async (val: T): Promise<SubmitResponse<T>> => {
    startLoading();

    try {
      const res = (await trigger?.(val)) as SubmitResponse<T>;

      if (res && res?.success) {
        handleSubmitSuccess();
        return {
          success: true,
        };
      } else handleSubmitError();
    } catch (err) {
      handleSubmitError();
      return {
        success: false,
      };
    } finally {
      stopLoading();
    }

    return {
      success: true,
    };
  };

  return { isLoading, onFinish };
};
