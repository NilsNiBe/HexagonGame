export const Cavalry = (
  props: { prefix: string } & React.SVGProps<SVGSVGElement>
) => {
  const prefix = props.prefix;

  return (
    <g>
      <ellipse
        className="horse"
        cx="46.706635"
        cy="45.738174"
        rx="8.2083797"
        ry="15.325688"
        transform="matrix(0.99690862,-0.07856968,0.07568082,0.99713209,0,0)"
      />
      <ellipse
        className="horse"
        cx="46.326153"
        cy="59.108173"
        rx="8.8499689"
        ry="12.103671"
        transform="matrix(0.99423654,-0.10720866,0.06557586,0.99784759,0,0)"
      />
      <ellipse
        className="horse"
        cx="50.867252"
        cy="22.093119"
        rx="3.7762508"
        ry="11.326108"
        transform="matrix(0.99712904,0.075721,-0.04716342,0.99888719,0,0)"
      />
      <ellipse
        className="horse"
        cx="45.251549"
        cy="27.07502"
        rx="3.630861"
        ry="4.2165732"
        transform="matrix(0.96954424,-0.24491625,0.22776518,0.97371609,0,0)"
      />
      <ellipse
        className="horse"
        cx="50.389244"
        cy="7.2129984"
        rx="2.2345314"
        ry="4.2111611"
        transform="matrix(0.99739655,0.07211181,-0.03592567,0.99935446,0,0)"
      />
      <ellipse
        className="horse"
        cx="26.874348"
        cy="40.394508"
        rx="2.1300039"
        ry="1.0390264"
        transform="rotate(-37.53463)"
      />
      <ellipse
        className="horse"
        cx="46.104687"
        cy="-32.784473"
        rx="2.1300039"
        ry="1.0390264"
        transform="rotate(51.919793)"
      />
      <ellipse
        className="horse"
        cx="49.028114"
        cy="66.699135"
        rx="1.9221988"
        ry="5.1951323"
        transform="rotate(0.477184)"
      />
      <ellipse
        className="horse"
        cx="81.894218"
        cy="-25.891718"
        rx="1.7290418"
        ry="4.4601765"
        transform="matrix(0.25207111,0.96770871,-0.96033916,0.27883454,0,0)"
      />
      <ellipse
        className="horse"
        cx="64.697586"
        cy="54.781776"
        rx="1.5988905"
        ry="4.5102949"
        transform="matrix(0.92798462,0.37261849,-0.33715757,0.94144823,0,0)"
      />
      <rect
        className="skin"
        width="3.7052217"
        height="18.550705"
        x="43.39521"
        y="41.723888"
        transform="matrix(0.95551141,-0.29495413,0.29752669,0.9547135,0,0)"
      />
      <rect
        className="gun"
        width="3.7058637"
        height="43.293728"
        x="57.329643"
        y="-30.769018"
        transform="matrix(0.74402238,0.6681547,-0.65410414,0.7564045,0,0)"
      />
      <rect
        className="skin"
        width="3.7051835"
        height="18.446625"
        x="54.108234"
        y="-1.4844971"
        transform="matrix(0.85990686,0.51045097,-0.50677682,0.86207729,0,0)"
      />
      <circle
        className={prefix + "normal"}
        cx="35.349632"
        cy="56.950207"
        transform="rotate(-16.845828)"
        r="9.7738371"
      />
      <circle
        className={prefix + "normal"}
        cx="45.873215"
        cy="59.674591"
        transform="rotate(-16.845828)"
        r="3.7908831"
      />
      <circle
        className={prefix + "normal"}
        cx="25.573904"
        cy="54.118992"
        transform="rotate(-16.845828)"
        r="3.7908831"
      />
      <ellipse
        className={prefix + "light"}
        cx="40.679035"
        cy="46.372288"
        rx="3.0921035"
        ry="2.6612363"
        transform="rotate(-7.0674033)"
      />
    </g>
  );
};