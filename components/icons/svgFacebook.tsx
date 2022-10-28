const SvgFacebook = ({ ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 48 48"
    width={42}
    height={42}
    {...props}
  >
    <linearGradient
      id="a"
      x1={9.993}
      x2={40.615}
      y1={9.993}
      y2={40.615}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset={0} stopColor={props.color0 || '#2aa4f4'} />
      <stop offset={1} stopColor={props.color1 || '#007ad9'} />
    </linearGradient>
    <path
      fill="url(#a)"
      d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4z"
    />
    <path
      fill={props.color2 || '#fff'}
      d="M26.707 29.301h5.176l.813-5.258h-5.989v-2.874c0-2.184.714-4.121 2.757-4.121h3.283V12.46c-.577-.078-1.797-.248-4.102-.248-4.814 0-7.636 2.542-7.636 8.334v3.498H16.06v5.258h4.948v14.452c.98.146 1.973.246 2.992.246.921 0 1.82-.084 2.707-.204V29.301z"
    />
  </svg>
)

export default SvgFacebook
