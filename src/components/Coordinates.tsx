import { COLORS } from "../assets/colors";
import Text from "./Text";

const fontStyle = { fontWeight: 500, fontSize: "0.6rem" };

export function Coordinates({
  q,
  r,
  s,
}: {
  q: number | string;
  r: number | string;
  s: number | string;
}) {
  return (
    <>
      <Text
        transform={`translate(${0}, ${-8})`}
        style={{ ...fontStyle, fill: COLORS.red[8] }}
      >
        {q}
      </Text>
      <Text
        transform={`translate(${-8}, ${4})`}
        style={{ ...fontStyle, fill: COLORS.green[8] }}
      >
        {s}
      </Text>
      <Text
        transform={`translate(${8}, ${4})`}
        style={{ ...fontStyle, fill: COLORS.blue[8] }}
      >
        {r}
      </Text>
    </>
  );
}
