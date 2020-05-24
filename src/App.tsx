import React, { useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { reorderRows } from "./utils/reorder";
import { RainbowMap } from "./utils/types";
import { TierList } from "./components/TierList";
import styled from "@emotion/styled";
import { useFetch } from "./utils/useFetch";
import BarLoader from "react-spinners/BarLoader";
import { Helmet } from "react-helmet";

const Container = styled.div`
  background: ${({ theme }) => theme.colors.background.dlight};
  color: ${({ theme }) => theme.colors.secondary.base};
  font-family: ${({ theme }) => theme.fontFamily.heading};
  padding: 10px;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  input {
    border-radius: 2px;
    border: none;
    width: 50vw;
    padding: calc(10px + 0.25vw);
    &:focus {
      outline: 2px solid ${({ theme }) => theme.colors.secondary.base};
    }
  }
  text-align: center;
  height: 150px;
  transition: ${({ theme }) => theme.transitions.boom.transition};
  @media (max-width: ${({ theme }) => theme.breakpoints.s}) {
    font-size: 1rem;
    input {
      width: 75vw;
    }
  }
`;

const Wrapper = styled.div`
  margin: 20px;
  @media (max-width: ${({ theme }) => theme.breakpoints.xs}) {
    margin: 12.5px;
  }
  transition: ${({ theme }) => theme.transitions.boom.transition};
`;

export const App: React.FC = () => {
  const [query, setQuery] = useState("ricardo");
  const { data, loading } = useFetch(
    // `https://api.giphy.com/v1/gifs/search?api_key=YAxFY6ZLyh7UdsekbTWbiWJCv2me8Vmi&q=${query}&limit=8&offset=0&rating=G&lang=en`
    `https://api.tenor.com/v1/search?q=${query}&key=${process.env.REACT_APP_TENOR_API_KEY}&limit=6`
  );
  const [rows, setRows] = useState([
    {
      label: "o",
      urls: [],
    },
    {
      label: "s",
      urls: [],
    },
    {
      label: "a",
      urls: [],
    },
    {
      label: "b",
      urls: [],
    },
    {
      label: "c",
      urls: [],
    },
    {
      label: "d",
      urls: [],
    },
    {
      label: "unranked",
      urls: [
        "https://media1.tenor.com/images/ec86c1ad73bb36b8be28e1076f50afda/tenor.gif?itemid=17143662",
      ],
    },
  ]);
  useEffect(() => {
    rows.pop();
    setRows([
      ...rows,
      {
        label: "unranked",
        urls: data,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const [bgColorMap] = useState<RainbowMap>({
    o: "#ECF0F1",
    s: "#E74C3C",
    a: "#F1C40F",
    b: "#2ECC71",
    c: "#3498DB",
    d: "#884EA0",
    unranked: "#000000",
  });

  return (
    <Wrapper>
      <Helmet>
        <title>Tierlist GIF Search Engine powered by Tenor</title>
      </Helmet>
      <DragDropContext
        onDragEnd={({ destination, source }) => {
          // // dropped outside the list
          if (destination) {
            setRows(reorderRows(rows, source, destination));
          }
        }}
      >
        {rows.map((row) => (
          <TierList
            internalScroll
            listId={row.label}
            bgColor={bgColorMap[row.label]}
            listType="CARD"
            row={row}
          />
        ))}
      </DragDropContext>
      <Container>
        Add your own!
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            onChange={(e) => {
              if (e.target.value.length > 3) {
                setQuery(e.target.value);
              }
            }}
            placeholder="powered by tenor (min. 4 letters)"
          ></input>
        </form>
        {loading ? (
          <Container>
            <BarLoader />
          </Container>
        ) : data !== null && query !== "" ? (
          <p>displaying results for: {query}</p>
        ) : null}
        {/* <button
            onClick={() => {
              html2canvas(document.querySelector("#capture") as any).then(
                (canvas) => {
                  document.body.appendChild(canvas);
                }
              );
            }}
          >
            if i ever decide to add in image grabber
          </button> */}
      </Container>
    </Wrapper>
  );
};

export default App;
