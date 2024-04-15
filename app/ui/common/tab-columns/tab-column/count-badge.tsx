import { getTodos } from "@/app/lib/data";
import { Badge } from "@/components/ui/badge";

export const CountBadge = async ({ tabId }: { tabId: number }) => {
  const todos = await getTodos(tabId);

  return <Badge>{todos?.length}</Badge>;
};
