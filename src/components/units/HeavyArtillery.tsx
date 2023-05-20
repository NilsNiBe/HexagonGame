export const HeavyArtillery = (
  props: { prefix: string } & React.SVGProps<SVGSVGElement>
) => {
  const prefix = props.prefix;

  return (
    <g>
      <rect
        className="wheel"
        width="5.7394156"
        height="24.246893"
        x="30.099638"
        y="70.58287"
        transform="matrix(0.94003427,-0.34108,0.34111993,0.94001978,0,0)"
      />
      <rect
        className="wheel"
        width="5.7394156"
        height="24.246893"
        x="-64.144768"
        y="36.769474"
        transform="matrix(-0.94003427,-0.34108,-0.34111993,0.94001978,0,0)"
      />
      <rect
        className={prefix + "normal"}
        width="11.006889"
        height="34.08477"
        x="46.720444"
        y="-67.035454"
        transform="matrix(0.00311441,0.99999515,-0.99989634,0.01439797,0,0)"
      />
      <rect
        className="wheel"
        width="4.6877398"
        height="24.246893"
        x="29.150366"
        y="39.00214"
      />
      <rect
        className="wheel"
        width="4.9384413"
        height="24.246893"
        x="66.330109"
        y="38.845695"
      />
      <rect
        className={prefix + "normal"}
        width="15.694487"
        height="18.062424"
        x="42.235813"
        y="52.781261"
      />
      <rect
        className="cannon"
        width="12.676911"
        height="44.780991"
        x="43.995312"
        y="13.404914"
      />
      <rect
        className="cannon"
        width="18.808294"
        height="19.508541"
        x="40.829014"
        y="36.257698"
      />
      <rect
        className="cannon-light"
        width="4.5746927"
        height="21.384027"
        x="45.002213"
        y="14.787961"
      />
      <rect
        className="cannon-light"
        width="4.5746927"
        height="17.979605"
        x="41.757366"
        y="37.07629"
      />
      <rect
        className="cannon-light"
        width="4.5746927"
        height="1.875091"
        x="44.736237"
        y="55.787312"
      />
    </g>
  );
};