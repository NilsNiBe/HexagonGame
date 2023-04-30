export const LightArtillery = (
  props: { prefix: string } & React.SVGProps<SVGSVGElement>
) => {
  const prefix = props.prefix;

  return (
    <g>
      <rect
        className={prefix + "normal"}
        width="4.1482887"
        height="27.618872"
        x="22.499701"
        y="67.915138"
        transform="rotate(-24.437253)"
      />
      <rect
        className={prefix + "normal"}
        width="4.1482887"
        height="27.618872"
        x="-67.875313"
        y="27.103416"
        transform="matrix(-0.91041487,-0.41369646,-0.41369646,0.91041487,0,0)"
      />
      <rect
        className={prefix + "normal"}
        width="7.2942543"
        height="27.919434"
        x="48.526295"
        y="-62.39006"
        transform="matrix(0.00384965,0.99999259,-0.99993215,0.0116485,0,0)"
      />
      <rect
        className="cannon"
        width="4.6404972"
        height="50.426643"
        x="47.428871"
        y="16.277395"
      />
      <rect
        className="wheel"
        width="3.3516169"
        height="27.618872"
        x="61.746433"
        y="37.973679"
      />
      <rect
        className="wheel"
        width="3.451201"
        height="27.618872"
        x="33.618671"
        y="38.122295"
      />
      <rect
        className="cannon-light"
        width="1.2766584"
        height="49.180653"
        x="47.994381"
        y="16.942322"
      />
    </g>
  );
};
