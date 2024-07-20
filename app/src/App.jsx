import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import SearchResults from "./component/Search Results/SearchResults/SearchResults";

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filtredData, setFiltredData] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all")

  useEffect(() => {
    const fetchFoodData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const json = await response.json();
        setData(json);
        setFiltredData(json);
        setLoading(false);
      } catch (error) {
        setError("Unable to fetch Data");
      }
    };
    fetchFoodData();
  }, []);

  const filterFood = (type) => {
    if (type === "all") {
      setFiltredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFiltredData(filter);
    setSelectedBtn(type);
  };
  

  const searchFood = (event) => {
    const searchValue = event.target.value;
    console.log(searchValue);

    if (searchValue === "") {
      setFiltredData(null);
    }

    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFiltredData(filter)
  };

  const filterBtns = [
    {
      name: "All",
      type: "all"
    },
    {
      name: "Breakfast",
      type: "breakfast"
    },
    {
      name: "Lunch",
      type: "lunch"
    },
    {
      name: "Dinner",
      type: "dinner"
    }
  ]

  if (error) {
    return <div>error</div>;
  }
  if (loading) {
    return <div>Loading.......</div>;
  }

  return (
    <>
      <Container>
        <TopContainer>
          <div className="logo">
            <img src="./logo.svg" alt="logo" />
          </div>

          <div className="search">
            <input
              onChange={searchFood}
              type="text"
              placeholder="Search Food...."
            />
          </div>
        </TopContainer>

        <FilterContainer>
          {
            filterBtns.map((value) => <Button key={value.name} onClick={() => filterFood(value.type)}>{value.name}</Button>)
          }
        </FilterContainer>
      </Container>
      <SearchResults data={filtredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-height: 1200px;
  margin: 0 auto;
`;

const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px 32px;
  align-items: center;

  .search {
    input {
      background-color: transparent;
      border: 1px solid #ff4343;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding: 8px;
      width: 300px;
    }
  }
`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 20px;
`;

export const Button = styled.button`
  background-color: #e13737;
  color: white;
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3 ease;
  &:hover {
    background-color: #ff4343;
  }
`;
