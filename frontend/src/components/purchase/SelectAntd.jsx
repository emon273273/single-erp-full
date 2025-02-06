import { Select } from "antd";
import cn from "classnames";
import { useState } from "react";
import ProductModal from "./ProductModal";

export default function SelectAntd({ addNew = {}, ismatch,...rest}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Select
        className="w-20"
        {...rest}
        showSearch
        optionFilterProp="label"
        dropdownRender={(menu) => (
          <>
            <div
              onClick={handleOpenModal}
              className="px-4 w-full border-b py-1 cursor-pointer select-none"
            >
              {!ismatch && <div className=" text-center bg-primary"> Add New+</div>}
            </div>
            {menu}
          </>
        )}
      ></Select>
      {addNew ? (
        <ProductModal
          open={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          title={addNew.title}
          className={cn("z-10 bg-white", {
            [addNew.className]: addNew.className,
          })}
          zIndex={addNew.zIndex}
        >
          {addNew.component}
        </ProductModal>
      ) : null}
    </>
  );
}
