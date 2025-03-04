// import { oAuth2Client } from "@/api/auth";
// import { useEffect } from "react";
// import { useSearchParams } from "react-router";

// export function OAuthHandler() {
//   useEffect(() => {
//     fetchAuthToken();
//   }, []);

//   const fetchAuthToken = async () => {
//     const [searchParams, setSearchParams] = useSearchParams();
//     const code = searchParams.get("code");
//     if (!code) return;
//     const r = await oAuth2Client.getToken(code);
//     oAuth2Client.setCredentials(r.tokens);
//   };
//   return (
//     <></>
//   );
// }
