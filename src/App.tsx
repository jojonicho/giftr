import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderColors } from "./reorder";
import { ColorMap } from "./types";
import { AuthorList } from "./AuthorList";

export const App: React.FC = () => {
  const [colorMap, setColors] = React.useState<ColorMap>({
    a: [
      "https://media1.tenor.com/images/ec86c1ad73bb36b8be28e1076f50afda/tenor.gif?itemid=17143662",
    ],
    b: [],
    c: [],
    unranked: [
      "https://i.imgur.com/7vFufwh.gif",
      "https://images-ext-1.discordapp.net/external/lrQxZenqKaNzirCWorykwK_fz76BiiH_ZzdLpeqbJLA/https/imgur.com/DBDBgGf.gif",
    ],
  });

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        // // dropped outside the list
        if (!destination) {
          return;
        }

        setColors(reorderColors(colorMap, source, destination));
      }}
    >
      <div>
        {Object.entries(colorMap).map(([k, v]) => (
          <AuthorList
            internalScroll
            key={k}
            listId={k}
            listType="CARD"
            urls={v}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default App;
