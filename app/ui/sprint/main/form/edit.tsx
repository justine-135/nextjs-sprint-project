import { ITodos } from "@/app/lib/definitions/tab-column";
import { Pane } from "@/app/ui/common/pane";
import { Textarea } from "@/components/ui/textarea";

export const EditForm = ({ data }: { data?: ITodos }) => {
  return (
    <Pane title={data?.title} id={data?.id}>
      <Textarea defaultValue={data?.content} />
    </Pane>
  );
};
