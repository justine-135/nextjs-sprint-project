import { ITodos } from "@/app/lib/definitions/tab-column";
import { Textarea } from "@/components/ui/textarea";

export const EditForm = ({ data }: { data?: ITodos }) => {
  return <Textarea defaultValue={data?.content} />;
};
