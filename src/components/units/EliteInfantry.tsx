export const EliteInfantry = (
  props: { prefix: string } & React.SVGProps<SVGSVGElement>
) => {
  const prefix = props.prefix;

  return (
    <g>
      <rect
        className="skin"
        width="4.9245987"
        height="29.136358"
        x="60.448067"
        y="-3.151269"
        transform="matrix(0.78180944,0.62351744,-0.62432898,0.78116152,0,0)"
      />
      <rect
        className="gun"
        width="6.8918629"
        height="36.363182"
        x="48.623154"
        y="13.717454"
      />
      <rect
        className="gun"
        width="2.3586555"
        height="4.0127645"
        x="50.894829"
        y="10.513621"
      />
      <rect
        id="rect2627-1-8"
        width="33.79834"
        height="4.0127645"
        x="34.949974"
        y="21.788662"
      />
      <rect
        className="skin"
        width="4.9246798"
        height="23.794031"
        x="20.656225"
        y="61.11433"
        transform="matrix(0.83506372,-0.55015323,0.54804543,0.83644857,0,0)"
      />
      <circle
        className={prefix + "normal"}
        cx="49.971367"
        cy="61.3125"
        r="14.773877"
      />
      <ellipse
        className={prefix + "normal"}
        cx="66.634926"
        cy="61.484291"
        rx="5.3254676"
        ry="5.2109418"
      />
      <ellipse
        className={prefix + "normal"}
        cx="33.594124"
        cy="61.08345"
        rx="5.5545201"
        ry="5.4399939"
      />
      <ellipse
        className={prefix + "light"}
        cx="44.88945"
        cy="55.713768"
        rx="5.2174649"
        ry="4.4904408"
      />
    </g>
  );
};
