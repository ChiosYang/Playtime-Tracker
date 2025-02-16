"use client";

import Navigation from "../components/header/navigation";
import Content from "../components/content/cardLayout";

export default function Home() {
  return (
    <>
      <Navigation></Navigation>
      <div style={{width:'80%',margin:'0 auto'}}>
        <Content></Content>
      </div>
    </>
  );
}
