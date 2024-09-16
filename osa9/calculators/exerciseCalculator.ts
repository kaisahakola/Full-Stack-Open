interface Result {
  periodLenght: number;
  trainingDays: number;
  target: number;
  avarage: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
}

interface HoursAndTarget {
  target: number;
  hours: number[];
}

const parseHours = (args: string[]): HoursAndTarget => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const slicedArgs = args.slice(2);

  const argHours = slicedArgs.every((item) => !isNaN(Number(item)));
  if (argHours) {
    const numbArray = slicedArgs.map(Number);
    const hoursInArray = numbArray.slice(1);
    return {
      target: numbArray[0],
      hours: hoursInArray,
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateExercises = (
  exerciseHours: number[],
  targetHours: number
): Result => {
  const length = exerciseHours.length;

  const numberOfTrainingDays = exerciseHours.filter((h) => h > 0).length;

  let hoursInTotal = 0;
  exerciseHours.forEach((h) => {
    hoursInTotal += h;
  });
  const avarageHours = hoursInTotal / length;

  let successRating = false;
  if (avarageHours >= targetHours) {
    successRating = true;
  }

  let ratingResult = 0;
  let ratingText = "Try harder next time!";
  if (avarageHours < targetHours / 2) {
    ratingResult = 1;
    ratingText = "That's decent";
  } else if (avarageHours >= targetHours / 2 && avarageHours < targetHours) {
    ratingResult = 2;
    ratingText = "Not bad but could be better";
  } else if (avarageHours >= targetHours) {
    ratingResult = 3;
    ratingText = "Well done!";
  }

  return {
    periodLenght: length,
    trainingDays: numberOfTrainingDays,
    target: targetHours,
    avarage: avarageHours,
    success: successRating,
    rating: ratingResult,
    ratingDescription: ratingText,
  };
};

if (require.main === module) {
  try {
    const { target, hours } = parseHours(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (error) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
