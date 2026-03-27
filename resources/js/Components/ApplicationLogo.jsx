export default function ApplicationLogo(props) {
  return (
      <svg {...props} viewBox="0 0 680 160" xmlns="http://www.w3.org/2000/svg">
          <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
        .rf-rent { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 82px; fill: #0F172A; letter-spacing: -4px; }
        .rf-flow { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 82px; fill: #6366F1; letter-spacing: -4px; }
        .rf-dot  { fill: #6366F1; }
        @media (prefers-color-scheme: dark) {
          .rf-rent { fill: #F8FAFC; }
        }
      `}</style>

          <text x="340" y="112" textAnchor="middle">
              <tspan className="rf-rent">RENT</tspan>
              <tspan className="rf-flow" dx="-2">
                  FLOW
              </tspan>
          </text>

          <rect
              className="rf-dot"
              x="333"
              y="124"
              width="14"
              height="3"
              rx="1.5"
          />
      </svg>
  );
}
