export interface BmiValues {
  height: number;
  mass: number;
}

export const parseBmi = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (a: number, b: number): string => {
  const height = a / 100;
  const bmi = b / height / height;
  if (bmi >= 25) {
    return "Overweight";
  } else if (bmi < 18.5) {
    return "Underweight";
  } else {
    return "Normal range";
  }
};

if (require.main === module) {
  try {
    const { height, mass } = parseBmi(process.argv);
    console.log(calculateBmi(height, mass));
  } catch (error) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
