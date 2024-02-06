import { Helmet } from "react-helmet-async";
import { HeaderSEOProps } from "../utils/types";

export default function HeaderSEO({ title, description, type = "website" }: HeaderSEOProps) {
  return (
    <Helmet>
      <title>{title} | Food Finder</title>
      <meta name="description" content={description} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
    </Helmet>
  );
}
