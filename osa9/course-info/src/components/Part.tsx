import { CoursePart } from "../App";

interface ContentProps {
  courseParts: CoursePart[];
}

const Part = (props: ContentProps) => {
  const parts = props.courseParts;
  return (
    <>
      {parts.map((part, index) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={index}>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>
                  <i>{part.description}</i>
                </p>
              </div>
            );
          case "group":
            return (
              <div key={index}>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p> project exercises: {part.groupProjectCount}</p>
              </div>
            );
          case "background":
            return (
              <div key={index}>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>
                  <i>{part.description}</i>
                </p>
                <p>material: {part.backgroundMaterial}</p>
              </div>
            );
          case "special":
            return (
              <div key={index}>
                <h3>
                  {part.name} {part.exerciseCount}
                </h3>
                <p>
                  <i>{part.description}</i>
                </p>
                <p>
                  requirements: {part.requirements.map((r) => r).join(", ")}
                </p>
              </div>
            );
          default:
            break;
        }
      })}
    </>
  );
};

export default Part;
