import Part from "./Part";
import { CoursePart } from "../App";

interface ContentProps {
  parts: CoursePart[];
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>
      <Part courseParts={props.parts} />
    </div>
  );
};

export default Content;
