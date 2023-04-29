export const Mountain = (
  props: { size: number } & React.SVGProps<SVGSVGElement>
) => {
  const { size, opacity } = props;
  return (
    <g
      id="mountain-sides"
      opacity={opacity}
      transform={`scale(${(2 * size) / 100}) translate(-50, -43.3)`}
    >
      <polygon className="light-mountain" points="25,0 50,43.3 0,43.3" />
      <polygon className="normal-mountain" points="50,43.3 0,43.3 25,86.6" />
      <polygon className="dark-mountain" points="50,43.3 75,86.6 25,86.6" />
      <polygon
        className="very-dark-mountain"
        points="50,43.3 75,86.6 100,43.3"
      />
      <polygon className="dark-mountain" points="50,43.3 75,0 100,43.3" />
      <polygon className="light-mountain" points="50,43.3 75,0 25,0" />
    </g>
  );
};
