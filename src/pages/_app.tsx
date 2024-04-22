import { AppProps } from "next/app";
import { UserProvider } from "../../contexts/User/UserContext";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
};

export default App;
