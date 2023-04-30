export const Forest = (
  props: { size: number } & React.SVGProps<SVGSVGElement>
) => {
  const { size, opacity } = props;

  return (
    <g
      transform={`scale(${(2 * size) / 100}) translate(-50, -43.3)`}
      opacity={opacity}
    >
      <circle
        className="dark-leafs"
        cx="38.451202"
        cy="15.406448"
        r="13.878813"
      />
      <circle
        className="light-leafs"
        cx="36.571455"
        cy="13.67286"
        r="11.221168"
      />
      <circle
        className="dark-leafs"
        cx="67.917595"
        cy="19.74546"
        r="13.878813"
      />
      <circle
        className="light-leafs"
        cx="66.03785"
        cy="18.01187"
        r="11.221168"
      />
      <circle
        className="dark-leafs"
        cx="48.782554"
        cy="43.250852"
        r="13.878813"
      />
      <circle
        className="light-leafs"
        cx="46.902804"
        cy="41.517267"
        r="11.221168"
      />
      <circle
        className="dark-leafs"
        cx="66.145835"
        cy="67.937422"
        r="13.878813"
      />
      <circle
        className="light-leafs"
        cx="64.26609"
        cy="66.203837"
        r="11.221168"
      />
      <circle
        className="dark-leafs"
        cx="35.907738"
        cy="71.008477"
        r="13.878813"
      />
      <circle
        className="light-leafs"
        cx="34.027989"
        cy="69.274893"
        r="11.221168"
      />
    </g>
  );
};
