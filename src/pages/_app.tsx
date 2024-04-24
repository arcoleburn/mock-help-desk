import { AppProps } from "next/app";
import { UserProvider } from "../shared/contexts/User/UserContext";
import Layout from "../shared/components/Layout";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
};

export default App;
