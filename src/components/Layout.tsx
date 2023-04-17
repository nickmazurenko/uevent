import React, { ReactNode } from "react";
import Header from "./Header";
import PageFooter from "./Footer";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="theme-dark min-h-screen min-w-screen w-full h-full">
    <Header />
    <div className="flex items-center justify-center w-full h-full min-h-screen">
      {props.children}
    </div>
    <PageFooter />
  </div>
);

export default Layout;
