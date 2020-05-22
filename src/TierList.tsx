import React from "react";
import styled from "@emotion/styled";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface Props {
  urls: string[];
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
  // transform: translate(0, 100%);
`;
const Container = styled.div`
  // display: flex;
`;
// const x = styled.div`
// `
const Wrapper = styled.div`
  margin: 1vw;
`;

const Tier = styled.div`
  // background: ${({ theme }) => theme.colors.secondary.base};
  background: ${({ theme }) => theme.gradient.rightToLeft};
  height: 100px;
  margin-bottom: 12.5px;
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  img {
    // width: calc(5vw + 40px);
    margin: 0 4px 0 8px;
    height: 100px;
    width: 100px;
    border-radius: ${({ theme }) => theme.borderRadius.round};
    box-shadow: ${({ theme }) => theme.shadow.image};
  }
`;

export const TierList: React.FC<Props> = ({
  listId,
  listType,
  urls,
  bgColor,
}) => {
  return (
    <Wrapper>
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
          </Container>
        )}
      </Droppable>
    </Wrapper>
  );
};
