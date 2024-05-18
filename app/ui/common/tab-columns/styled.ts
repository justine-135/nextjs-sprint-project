import { ScrollArea } from "@/components/ui/scroll-area";
import styled from "styled-components";

export const TabColumnContainer = styled.div`
  display: flex;
  align-items: start;
  gap: 1.5rem;
  height: calc(100vh - 205px);
`;

export const ScrollAreaStyled = styled(ScrollArea)`
  height: 100%;
`;
