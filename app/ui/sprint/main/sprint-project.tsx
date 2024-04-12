import { ITabColumns } from "@/app/lib/definitions/tab-column";
import { TabColumns } from "../../common/tab-columns";

interface ISprintProject {
  tabs?: ITabColumns[];
}

export default function SprintProject({ tabs }: ISprintProject) {
  return <TabColumns data={tabs} />;
}
