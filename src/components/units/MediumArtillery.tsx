export const MediumArtillery = (
  props: { prefix: string } & React.SVGProps<SVGSVGElement>
) => {
  const prefix = props.prefix;

  return (
    <g>
      <rect
        className={prefix + "normal"}
        width="17.44894"
        height="14.490318"
        x="41.171978"
        y="53.503471"
      />
      <rect
        className={prefix + "normal"}
        width="6.193079"
        height="26.163452"
        x="27.261059"
        y="67.976295"
        transform="matrix(0.94003427,-0.34108,0.34111993,0.94001978,0,0)"
      />
      <rect
        className={prefix + "normal"}
        width="6.193079"
        height="26.163452"
        x="-66.50296"
        y="33.905533"
        transform="matrix(-0.94003427,-0.34108,-0.34111993,0.94001978,0,0)"
      />
      <rect
        className={prefix + "normal"}
        width="6.9099007"
        height="32.992065"
        x="48.762604"
        y="-67.414162"
        transform="matrix(0.00480224,0.99998847,-0.9999564,0.00933805,0,0)"
      />
      <rect
        className="wheel"
        width="4.6843781"
        height="26.163452"
        x="64.243629"
        y="38.925575"
      />
      <rect
        className="wheel"
        width="4.6843786"
        height="26.163452"
        x="30.746189"
        y="38.864792"
      />
      <rect
        className="cannon"
        width="7.7501712"
        height="47.971375"
        x="46.09697"
        y="16.277393"
      />
      <rect
        className="cannon"
        width="12.637791"
        height="20.061972"
        x="43.436054"
        y="44.06403"
      />
      <rect
        className="cannon-light"
        width="2.127764"
        height="27.128992"
        x="46.864002"
        y="16.96892"
      />
      <rect
        className="cannon-light"
        width="2.127764"
        height="18.511547"
        x="44.310688"
        y="44.842632"
      />
    </g>
  );
};
