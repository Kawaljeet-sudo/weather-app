import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const Topbar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      axios
        .get(`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${searchQuery}`)
        .then((response) => {
          setSuggestions(response.data);
        })
        .catch((error) => {
          console.log("Error fetching suggestions:", error);
        });
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const setWeather = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?q=${searchQuery}`);
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (cityName) => {
    setSearchQuery("");
    setSuggestions([]); // Clear suggestions immediately
    navigate(`/?q=${cityName}`);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="#">YourWeather</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            {/* <Nav.Link href="#">Home</Nav.Link> */}
          </Nav>
          {/* Responsive Form with Proper Dropdown Placement */}
          <Form
            className="d-flex position-relative w-100"
            onSubmit={setWeather}
            style={{ maxWidth: "400px", minWidth: "250px" }}
          >
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {/* <Button type="submit" variant="outline-success">
              Search
            </Button> */}

            {/* Suggestions Dropdown (Responsive & Scrollable) */}
            {suggestions.length > 0 && (
              <ListGroup
                className="position-absolute bg-white shadow mt-2 w-100 rounded"
                style={{
                  zIndex: 1050, // Ensures it appears above other elements
                  top: "100%", // Positions it below the input field
                  left: 0,
                  maxHeight: "200px", // Prevents overflow on small screens
                  overflowY: "auto", // Adds scroll if needed
                  minWidth: "250px", // Ensures a good width even on small screens
                }}
              >
                {suggestions.map((suggestion, index) => (
                  <ListGroup.Item
                    key={index}
                    action
                    onClick={() => handleSuggestionClick(suggestion.name)}
                    className="py-2"
                  >
                    {suggestion.name},{suggestion.region},{suggestion.country}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Topbar;
