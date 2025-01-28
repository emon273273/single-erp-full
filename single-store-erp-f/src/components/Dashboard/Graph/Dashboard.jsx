import React, { useState } from "react";

import moment from "moment";
import { useSelector } from "react-redux";
import QuickLink from "../../../layouts/QuickLink";
import Content from "../RecentContent/Content";
import InventoryContent from "../RecentContent/InventoryContent";
import DemoLine from "./Demoline";
import Footer from "../../../layouts/Footer";

const Dashboard = () => {
  const { data, loading } = useSelector((state) => state?.setting) || {};
  const [pageConfig, setPageConfig] = useState({
    count: 5,
    startDate: moment().startOf("month").format("YYYY-MM-DD"),
    endDate: moment().endOf("month").format("YYYY-MM-DD"),
  });

  let card;
  if (loading) {
    card = (
      <section className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-5 mb-5">
        <div className="ant-shadow w-full h-[70px] md:h-[120px]  bg-slate-100 animate-pulse rounded-lg "></div>
        <div className="ant-shadow w-full h-[70px] md:h-[120px]  bg-slate-100 animate-pulse rounded-lg "></div>
        <div className="ant-shadow w-full h-[70px] md:h-[120px]  bg-slate-100 animate-pulse rounded-lg "></div>
        <div className="ant-shadow w-full h-[70px] md:h-[120px]  bg-slate-100 animate-pulse rounded-lg "></div>
      </section>
    );
  } else if (data && !loading) {
    card = <DemoLine pageConfig={pageConfig} data={data} />;
  } else if (!data && !loading) {
    card = "";
  }
  return (
    <>
      <div className="mb-5">
        <QuickLink pageConfig={pageConfig} setPageConfig={setPageConfig} />
        {card}
      </div>
      <div className="mb-5">
        {data?.dashboardType === "inventory" ? (
          <InventoryContent pageConfig={pageConfig} />
        ) : (
          <Content pageConfig={pageConfig} />
        )}
      </div>

      <Footer data={data} />
    </>
  );
};

export default Dashboard;
