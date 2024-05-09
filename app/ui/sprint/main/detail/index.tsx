import { ROUTE_URL } from "@/app/lib/constants/routeStrings";
import { ITodos } from "@/app/lib/definitions/tab-column";
import LinkButton from "@/app/ui/common/button/link-button";
import { Textarea } from "@/components/ui/textarea";

export default function TodoDetail({ data }: { data?: ITodos }) {
  return (
    <div>
      <div>
        <LinkButton
          title="Back to board"
          href={`/${ROUTE_URL.SPRINT}/pane/${data?.id}`}
        />
      </div>
      <div className="flex items-start gap-12 mt-10">
        <section className="p-md rounded border-default w-9/12">
          <h1 className="font-medium text-3xl">
            {data?.title} <span>[{data?.id}]</span>
          </h1>
          <section className="flex mt-6">
            <div className="h-12 w-12 min-w-12 rounded-full bg-orange-500 mr-2" />
            <Textarea defaultValue={data?.content} />
          </section>
        </section>
        <aside className="border-default rounded p-md flex-shrink w-1/4">
          Aside
        </aside>
      </div>
    </div>
  );
}
