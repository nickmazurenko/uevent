import React, { ReactNode } from "react";
import Header from "./Header";

type Props = {
  children: ReactNode;
};

const Layout: React.FC<Props> = (props) => (
  <div className="theme-dark">
    <Header />
    <div className="flex items-center justify-center h-full min-h-screen">{props.children}</div>
  </div>
);

export default Layout;
