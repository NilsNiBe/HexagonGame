export const Infantry = (
  props: { prefix: string } & React.SVGProps<SVGSVGElement>
) => {
  const prefix = props.prefix;
  return (
    <g>
      <rect
        className="skin"
        width="5.1469827"
        height="35.214928"
        x="60.891609"
        y="-12.290725"
        transform="matrix(0.74545388,0.66655721,-0.65978607,0.75145349,0,0)"
      />
      <rect
        className="gun"
        width="5.1466808"
        height="42.809746"
        x="54.900265"
        y="13.760812"
      />
      <rect
        className="skin"
        width="5.1466818"
        height="20.226746"
        x="35.357323"
        y="60.613754"
        transform="matrix(0.91681756,-0.39930635,0.39961608,0.9166826,0,0)"
      />
      <circle
        className={prefix + "normal"}
        id="path1889"
        cx="49.873272"
        cy="60.999096"
        r="15.440053"
      />
      <ellipse
        className={prefix + "normal"}
        cx="67.288223"
        cy="61.178635"
        rx="5.5656013"
        ry="5.4459114"
      />
      <ellipse
        className={prefix + "normal"}
        cx="32.757553"
        cy="60.759724"
        rx="5.8049817"
        ry="5.6852913"
      />
      <ellipse
        className={prefix + "light"}
        cx="44.955437"
        cy="54.474194"
        rx="5.949223"
        ry="5.1215053"
      />
    </g>
  );
};
