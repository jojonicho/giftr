import React from "react";
import styled from "@emotion/styled";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  urls: string[];
  listId: string;
  listType?: string;
  internalScroll?: boolean;
  isCombineEnabled?: boolean;
}

const Container = styled.div``;
// const x = styled.div`
// `

const Tier = styled.div`
  background: ${({ theme }) => theme.colors.secondary.base};
  min-height: 60px;
  margin: 20px;
  display: flex;
  img {
    width: calc(5vw + 40px);
  }
`;

export const AuthorList: React.FC<Props> = ({ listId, listType, urls }) => {
  return (
    <Container>
      <Droppable
        droppableId={listId}
        type={listType}
        direction="horizontal"
        isCombineEnabled={false}
      >
        {(dropProvided) => (
          <div {...dropProvided.droppableProps}>
            <Tier ref={dropProvided.innerRef}>
              {urls.map((url, index) => (
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
          </div>
        )}
      </Droppable>
    </Container>
  );
};
