import React, { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderColors } from "./reorder";
import { ColorMap, RainbowMap } from "./types";
import { TierList } from "./TierList";

export const App: React.FC = () => {
  const [colorMap, setColors] = useState<ColorMap>({
    o: [],
    s: [],
    a: [
      "https://media1.tenor.com/images/ec86c1ad73bb36b8be28e1076f50afda/tenor.gif?itemid=17143662",
    ],
    b: [],
    c: [],
    d: [],
    unranked: [
      "https://i.imgur.com/7vFufwh.gif",
      "https://images-ext-1.discordapp.net/external/lrQxZenqKaNzirCWorykwK_fz76BiiH_ZzdLpeqbJLA/https/imgur.com/DBDBgGf.gif",
    ],
  });
  const [bgColorMap, setbgColors] = useState<RainbowMap>({
    o: "#ECF0F1",
    s: "#F1C40F",
    a: "#E74C3C",
    b: "#2ECC71",
    c: "#3498DB",
    d: "#884EA0",
    unranked: "#000000",
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
          <TierList
            internalScroll
            listId={k}
            bgColor={bgColorMap[k]}
            listType="CARD"
            urls={v}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default App;
