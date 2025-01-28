import { DatePicker } from "antd";
import dayjs from "dayjs";
import { AiFillPrinter } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { FaMoneyBillTransfer, FaMoneyBillTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
export default function QuickLink({ pageConfig, setPageConfig }) {
  const { RangePicker } = DatePicker;
  const onCalendarChange = (dates) => {
    const startDate = dates[0].format("YYYY-MM-DD");
    const endDate = dates[1].format("YYYY-MM-DD");

    setPageConfig((prev) => {
      return {
        ...prev,
        startDate,
        endDate,
      };
    });
  };
  return (
    <div className="border rounded-lg">
      <div className="flex justify-between items-center pt-2 px-3">
        <h1 className="text-[18px] dark:text-white font-semibold ">
          Quick Link
        </h1>
        <div>
          <RangePicker
            className="range-picker"
            onCalendarChange={onCalendarChange}
            defaultValue={[
              dayjs(pageConfig.startDate, "YYYY-MM-DD"),
              dayjs(pageConfig.endDate, "YYYY-MM-DD"),
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-5 my-5">
        <div className="flex justify-center gap-5">
          <Link
            to="/admin/sale/add"
            className="flex flex-col items-center justify-center w-[120px] sm:w-[120px] lg:w-[150px] py-4 rounded-lg cursor-pointer text-[#2563eb] bg-[#2563eb]/10 hover:shadow"
          >
            <FaMoneyBillTrendUp size={25} />
            <p className="text-xs md:text-[12px] font-bold pt-[3px]">
              CREATE SALE
            </p>
          </Link>
          <Link
            to="/admin/purchase/add"
            className="flex flex-col items-center justify-center w-[120px] sm:w-[120px] lg:w-[150px]  py-4 rounded-lg cursor-pointer text-[#8b5cf6] bg-[#8b5cf6]/10 hover:shadow"
          >
            <FaCartPlus size={25} />
            <p className="text-xs md:text-[12px] font-bold pt-[3px]">
              CREATE PURCHASE
            </p>
          </Link>
        </div>
        <div className="flex justify-center gap-5">
          <Link
            to="/admin/transaction/"
            className="flex flex-col justify-center items-center w-[120px] sm:w-[120px] lg:w-[150px] py-4 rounded-lg cursor-pointer text-[#2563eb] bg-[#2563eb]/10 hover:shadow"
          >
            <FaMoneyBillTransfer size={25} />
            <p className="text-xs md:text-[12px] font-bold pt-[3px] text-center">
              CREATE TRANSACTION
            </p>
          </Link>
          <Link
            to="/admin/pos"
            className="flex flex-col justify-center items-center w-[120px] sm:w-[120px] lg:w-[150px] py-4 rounded-lg cursor-pointer text-[#8b5cf6] bg-[#8b5cf6]/10 hover:shadow"
          >
            <AiFillPrinter size={25} />
            <p className="text-xs md:text-[12px] font-bold pt-[3px]">POS</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
