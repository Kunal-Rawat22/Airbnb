/* eslint-disable react/prop-types */
export default function Image({ src, ...rest })
{
    const path = src && src.includes("https://")
      ? src
      : "http://localhost:4000/uploads/"+src
    return (
      <img
        src={path}
        {...rest}
      />
    );
}