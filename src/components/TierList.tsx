import React from "react";
import styled from "@emotion/styled";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Row } from "../utils/types";

interface Props {
  row: Row;
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  bgColor: string;
  isCombineEnabled?: boolean;
}

interface LabelProps {
  rank: string;
}

const Label = styled.div<LabelProps>`
  background: ${({ rank }) => rank};
  width: 25px;
  height: 25px;
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-family: ${({ theme }) => theme.fontFamily.heading};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    width: 20px;
    height: 20px;
  }
  font-weight: bold;
`;
const Container = styled.div``;

const Tier = styled.div`
  background: ${({ theme }) => theme.gradient.rightToLeft};
  min-height: 100px;
  margin-bottom: 12.5px;
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  flex-wrap: wrap;
  transition: ${({ theme }) => theme.transitions.boom.transition};
  img {
    transition: ${({ theme }) => theme.transitions.boom.transition};
    margin: 0 4px 0 8px;
    height: 100px;
    width: 100px;
    border-radius: ${({ theme }) => theme.borderRadius.round};
    box-shadow: ${({ theme }) => theme.shadow.feature.small.default};
    &:hover {
      box-shadow: ${({ theme }) => theme.shadow.feature.small.hover};
      transform: scale(1.1);
    }
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    min-height: 65px;
    img {
      margin: 0 2px 0 4px;
      height: 65px;
      width: 65px;
      border-radius: ${({ theme }) => theme.borderRadius.round};
      box-shadow: ${({ theme }) => theme.shadow.image};
    }
  }
`;

export const TierList: React.FC<Props> = ({
  listId,
  listType,
  row,
  bgColor,
}) => {
  return (
    <>
      {listId === "unranked" ? null : (
        <Label rank={bgColor}>{listId.toUpperCase()}</Label>
      )}
      <Droppable
        droppableId={listId}
        type={listType}
        direction="horizontal"
        isCombineEnabled={false}
      >
        {(dropProvided) => (
          <Container {...dropProvided.droppableProps}>
            <Tier ref={dropProvided.innerRef}>
              {row.urls.map((url, index) => (
                <Draggable key={url} draggableId={url} index={index}>
                  {(dragProvided) => (
                    <div
                      {...dragProvided.dragHandleProps}
                      {...dragProvided.draggableProps}
                      ref={dragProvided.innerRef}
                    >
                      <img src={url} alt={url} />
                    </div>
                  )}
                </Draggable>
              ))}
              {dropProvided.placeholder}
            </Tier>
          </Container>
        )}
      </Droppable>
    </>
  );
};
