import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
  height: "100px",
  width: "100px",
  overflow: "hidden",
  display: "block",
  paddingBottom: "50px",
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      <Image
        src="/images/logos/logo.png"
        alt="logo"
        height={100}
        width={100}
        priority
      />
    </LinkStyled>
  );
};

export default Logo;
