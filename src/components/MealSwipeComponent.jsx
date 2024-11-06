import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Container,
  Grid,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Hammer from "hammerjs";

// Original meal data
const mealsData = {
  Monday: [
    {
      meal: "Breakfast",
      title: "Fluffy Pancakes",
      calories: 420,
      macros: { protein: 10, fats: 14, carbs: 45 },
      image: "https://images.unsplash.com/photo-1559638740-3d5419b8b16a",
    },
    {
      meal: "Lunch",
      title: "Grilled Salmon Salad",
      calories: 520,
      macros: { protein: 30, fats: 20, carbs: 40 },
      image: "https://images.unsplash.com/photo-1514516876419-2c04ed3d3c74",
    },
    {
      meal: "Dinner",
      title: "Pasta Carbonara",
      calories: 700,
      macros: { protein: 25, fats: 30, carbs: 70 },
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    },
  ],
  Tuesday: [
    {
      meal: "Breakfast",
      title: "Greek Yogurt Parfait",
      calories: 350,
      macros: { protein: 20, fats: 5, carbs: 50 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Chicken Caesar Wrap",
      calories: 600,
      macros: { protein: 35, fats: 25, carbs: 45 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "Stir-Fried Tofu and Vegetables",
      calories: 450,
      macros: { protein: 20, fats: 15, carbs: 60 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Wednesday: [
    {
      meal: "Breakfast",
      title: "Oatmeal with Berries",
      calories: 250,
      macros: { protein: 10, fats: 5, carbs: 45 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Quinoa Salad",
      calories: 400,
      macros: { protein: 15, fats: 10, carbs: 60 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "Beef Stir-Fry",
      calories: 700,
      macros: { protein: 40, fats: 30, carbs: 60 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Thursday: [
    {
      meal: "Breakfast",
      title: "Smoothie Bowl",
      calories: 300,
      macros: { protein: 15, fats: 8, carbs: 50 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Turkey Sandwich",
      calories: 500,
      macros: { protein: 30, fats: 15, carbs: 50 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "Vegetable Curry",
      calories: 600,
      macros: { protein: 15, fats: 20, carbs: 85 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Friday: [
    {
      meal: "Breakfast",
      title: "Egg and Spinach Wrap",
      calories: 350,
      macros: { protein: 20, fats: 15, carbs: 30 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Poke Bowl",
      calories: 600,
      macros: { protein: 30, fats: 20, carbs: 65 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "Shrimp Tacos",
      calories: 500,
      macros: { protein: 25, fats: 15, carbs: 55 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Saturday: [
    {
      meal: "Breakfast",
      title: "French Toast",
      calories: 400,
      macros: { protein: 12, fats: 18, carbs: 50 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Lunch",
      title: "Caprese Salad",
      calories: 350,
      macros: { protein: 15, fats: 20, carbs: 30 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
    {
      meal: "Dinner",
      title: "BBQ Chicken",
      calories: 700,
      macros: { protein: 40, fats: 30, carbs: 60 },
      image: "https://images.unsplash.com/photo-1589927986089-35812378b8e8",
    },
  ],
  Sunday: [
    {
      meal: "Breakfast",
      title: "Avocado Toast",
      calories: 300,
      macros: { protein: 8, fats: 12, carbs: 40 },
      image: "https://images.unsplash.com/photo-1555685812-4f7e1b0e1b58",
    },
  ],
};

const StyledDayButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#00838F",
  color: "white",
  "&:hover": {
    backgroundColor: "#00ACC1",
  },
  "&:disabled": {
    backgroundColor: "#004d5a",
  },
}));

const TinderCard = styled(Paper)(({ removed }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  backgroundColor: "#FFF",
  borderRadius: "10px",
  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
  transition: "transform 0.3s ease, opacity 0.3s ease",
  cursor: "grab",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-evenly",
  padding: "20px",
  ...(removed && {
    display: "none",
  }),
}));

const StyledMiniCard = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "180px",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  display: "flex",
  fontSize: "14px",
  margin: "10px 0",
}));

const ImageContainer = styled(Box)({
  width: "50%",
  height: "100%",
  overflow: "hidden",
  position: "relative",
});

const CalorieBadge = styled(Box)({
  position: "absolute",
  top: "10px",
  left: "10px",
  background: "linear-gradient(135deg, #4CAF50, #83e68c)",
  color: "#fff",
  padding: "5px 10px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: "5px",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
});

const MealInfo = styled(Box)({
  width: "50%",
  padding: "15px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

const MacroItem = styled(Box)(({ dotColor }) => ({
  display: "flex",
  alignItems: "center",
  gap: "5px",
  "&::before": {
    content: '""',
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: dotColor,
    display: "inline-block",
  },
}));

const TinderContainer = styled(Box)({
  width: "90vw",
  maxWidth: "450px",
  height: "500px",
  position: "relative",
  margin: "0 auto",
});

const MealPlanner = () => {
  const [currentDay, setCurrentDay] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [showChosenMeals, setShowChosenMeals] = useState(false);
  const [tinderCards, setTinderCards] = useState([]);
  const [swipingStarted, setSwipingStarted] = useState(false);
  const [chosenMeals, setChosenMeals] = useState({
    Sunday: [],
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
  });

  const cardsRef = useRef([]);

  useEffect(() => {
    if (currentDay && mealsData[currentDay]) {
      setTinderCards(mealsData[currentDay]);
    }
  }, [currentDay]);

  useEffect(() => {
    if (tinderCards.length > 0) {
      initializeCards();
    }
  }, [tinderCards]);

  const initializeCards = () => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        const hammertime = new Hammer(card);

        hammertime.on("pan", (event) => {
          card.classList.add("moving");
          const xMulti = event.deltaX * 0.03;
          const yMulti = event.deltaY / 80;
          const rotate = xMulti * yMulti;

          card.style.transform = `translate(${event.deltaX}px, ${event.deltaY}px) rotate(${rotate}deg)`;
          setSwipingStarted(true);
        });

        hammertime.on("panend", (event) => {
          card.classList.remove("moving");
          const keep =
            Math.abs(event.deltaX) < 100 && Math.abs(event.velocityX) < 0.5;

          if (keep) {
            card.style.transform = "";
          } else {
            const endX = event.deltaX > 0 ? 1000 : -1000;
            card.style.transform = `translate(${endX}px, ${event.deltaY}px)`;
            card.classList.add("removed");

            if (event.deltaX > 0) {
              // Liked meal
              setChosenMeals((prev) => ({
                ...prev,
                [currentDay]: [...prev[currentDay], tinderCards[index]],
              }));
            }

            setTinderCards((prev) => prev.filter((_, i) => i !== index));

            if (index === tinderCards.length - 1 && swipingStarted) {
              setOpenDialog(true);
            }
          }
        });
      }
    });
  };

  const handleDayClick = (day) => {
    setCurrentDay(day);
    setShowChosenMeals(false);
    setSwipingStarted(false);
    if (mealsData[day]) {
      setTinderCards(mealsData[day]);
    }
  };

  const handleShowChosenPlan = () => {
    setShowChosenMeals(true);
  };

  const handleRedo = () => {
    setOpenDialog(false);
    if (currentDay && mealsData[currentDay]) {
      setTinderCards(mealsData[currentDay]);
      setSwipingStarted(false);
    }
  };

  const handleCloseRedo = () => {
    setOpenDialog(false);
    // Mark day as completed
    const updatedMeals = { ...chosenMeals };
    updatedMeals[currentDay] = [];
    setChosenMeals(updatedMeals);
  };

  const handleSwipeButton = (direction) => {
    if (tinderCards.length > 0) {
      const card = cardsRef.current[0];
      if (card) {
        const endX = direction === "right" ? 1000 : -1000;
        card.style.transform = `translate(${endX}px, 0)`;
        card.classList.add("removed");

        if (direction === "right") {
          setChosenMeals((prev) => ({
            ...prev,
            [currentDay]: [...prev[currentDay], tinderCards[0]],
          }));
        }

        setTinderCards((prev) => prev.slice(1));
        setSwipingStarted(true);

        if (tinderCards.length === 1) {
          setOpenDialog(true);
        }
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        {/* Day Buttons */}
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 1,
              p: 2,
              backgroundColor: "#006064",
            }}
          >
            {Object.keys(mealsData).map((day) => (
              <StyledDayButton
                key={day}
                onClick={() => handleDayClick(day)}
                disabled={chosenMeals[day].length > 0}
              >
                {day}
                {chosenMeals[day].length > 0 && (
                  <span
                    style={{
                      color: "red",
                      fontSize: "16px",
                      marginLeft: "5px",
                    }}
                  >
                    ✘
                  </span>
                )}
              </StyledDayButton>
            ))}
            <StyledDayButton onClick={handleShowChosenPlan}>
              Chosen Diet Plan
            </StyledDayButton>
          </Box>
        </Grid>

        {/* Tinder Cards Section */}
        {!showChosenMeals && currentDay && (
          <Grid item xs={12}>
            <TinderContainer>
              {tinderCards.map((meal, index) => (
                <TinderCard
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  style={{
                    zIndex: tinderCards.length - index,
                    transform: `scale(${1 - index * 0.05}) translateY(-${
                      index * 20
                    }px)`,
                  }}
                >
                  <StyledMiniCard>
                    <ImageContainer>
                      <img
                        src={meal.image}
                        alt={meal.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <CalorieBadge>🔥 {meal.calories} Calories</CalorieBadge>
                    </ImageContainer>
                    <MealInfo>
                      <Typography variant="h6">{meal.meal}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {meal.title}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.5,
                        }}
                      >
                        <MacroItem dotColor="#F3A830">
                          {meal.macros.protein}g Protein
                        </MacroItem>
                        <MacroItem dotColor="#5C85D6">
                          {meal.macros.fats}g Fats
                        </MacroItem>
                        <MacroItem dotColor="#68B168">
                          {meal.macros.carbs}g Carbs
                        </MacroItem>
                      </Box>
                    </MealInfo>
                  </StyledMiniCard>
                </TinderCard>
              ))}
            </TinderContainer>
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => handleSwipeButton("left")}
              >
                Nope
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleSwipeButton("right")}
              >
                Love
              </Button>
            </Box>
          </Grid>
        )}

        {/* Chosen Meals View */}
        {showChosenMeals && (
          <Grid item xs={12}>
            {Object.entries(chosenMeals).map(
              ([day, meals]) =>
                meals.length > 0 && (
                  <Box key={day} sx={{ mb: 2 }}>
                    <Typography variant="h6">{day}</Typography>
                    <Grid container spacing={2}>
                      {meals.map((meal, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <StyledMiniCard>
                            <ImageContainer>
                              <img
                                src={meal.image}
                                alt={meal.title}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                              <CalorieBadge>
                                🔥 {meal.calories} Calories
                              </CalorieBadge>
                            </ImageContainer>
                            <MealInfo>
                              <Typography variant="h6">{meal.meal}</Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                {meal.title}
                              </Typography>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: 0.5,
                                }}
                              >
                                <MacroItem dotColor="#F3A830">
                                  {meal.macros.protein}g Protein
                                </MacroItem>
                                <MacroItem dotColor="#5C85D6">
                                  {meal.macros.fats}g Fats
                                </MacroItem>
                                <MacroItem dotColor="#68B168">
                                  {meal.macros.carbs}g Carbs
                                </MacroItem>
                              </Box>
                            </MealInfo>
                          </StyledMiniCard>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                )
            )}
          </Grid>
        )}
      </Grid>

      {/* Redo Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Select Your Option</DialogTitle>
        <DialogContent>
          <Typography>Do you want to redo?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRedo}>Yes</Button>
          <Button onClick={handleCloseRedo}>No</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MealPlanner;
