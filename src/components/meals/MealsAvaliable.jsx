import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./mealItem/MealItem";
import classes from "./MealsAvaliable.module.css";

const MealsAvaliable = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const api = await fetch(
          "https://react-http-9927e-default-rtdb.firebaseio.com/meals.json"
        );

        if (!api.ok) throw new Error("Something went wrong!");

        const mealsData = await api.json();

        let mealsArray = [];
        for (const key in mealsData) {
          mealsArray.push({
            id: key,
            name: mealsData[key].name,
            description: mealsData[key].description,
            price: mealsData[key].price,
          });
        }

        setMeals(mealsArray);
      } catch (error) {
        setHasError(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.loading}>Loading...</p>
      </section>
    );
  }

  if (hasError) {
    return (
      <section>
        <p className={classes.error}>{hasError}</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default MealsAvaliable;
