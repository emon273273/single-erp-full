import { Button, DatePicker, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadProduct } from "../../redux/rtk/features/product/productSlice";
import { loadSuppliers } from "../../redux/rtk/features/supplier/supplierSlice";
import Products from "./Products";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { addPurchase } from "../../redux/rtk/features/purchase/purchaseSlice";
import AddSup from "../suppliers/addSup";
import Payments from "./Payments";
import SelectAntd from "./SelectAntd";
const AddPurchase = () => {
  const [loader, setLoader] = useState(false);
  const [subTotal, setSubTotal] = useState([]);
  const [due, setDue] = useState(0);
  const [selectedSupplier, setSelectedSupplier] = useState();
  const [selectedSupplierId, setSelectedSupplierId] = useState();
  const [selectedSupplierAddress, setSelectedSupplierAddress] = useState();
  const [selectedSupplierPhone, setSelectedSupplierPhone] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSuppliers({ status: true, page: 1, count: 10 }));
    dispatch(loadProduct({ query: "all" }));
  }, [dispatch]);

  const allSuppliers = useSelector((state) => state.suppliers.list);
  const { list: productList, loading: productLoading } = useSelector(
    (state) => state.products
  );

  const [form] = Form.useForm();

  const onFormSubmit = async (values) => {
    try {
      const purchaseInvoiceProduct = form.getFieldValue(
        "purchaseInvoiceProduct"
      );

      const mergedObject = purchaseInvoiceProduct?.reduce(
        (accumulator, currentObject) => {
          const productName = currentObject.productName;

          if (!accumulator[productName]) {
            accumulator[productName] = { ...currentObject };
          } else {
            accumulator[productName].productQuantity +=
              currentObject.productQuantity;
          }
          return accumulator;
        },
        {}
      );

      const mergedArray = Object.values(mergedObject);

      const newArray = mergedArray.map((product) => {
        const productId = productList.find(
          (p) => p.name.toLowerCase() === product.productName?.toLowerCase()
        )?.id;

        return {
          ...product,
          productId,
          productQuantity: product.productQuantity,
          productUnitPurchasePrice: product.productPurchasePrice,
          productUnitSalePrice: product.productSalePrice,
          tax: product.tax,
        };
      });

      let supplierId = null;
      if (selectedSupplierId) {
        supplierId = selectedSupplierId;
      } else {
        supplierId = allSuppliers.find(
          (item) => item.name === selectedSupplier
        )?.id;
      }

      const data = {
        ...values,
        purchaseInvoiceProduct: newArray,
        paidAmount: values.paidAmount || [],
        supplierId,
      };

      const resp = await dispatch(addPurchase(data));
      if (resp.payload.message === "success") {
        form.resetFields();
        setLoader(false);
        navigate(`/admin/purchase/${resp.payload.data.id}`);
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  // total calculate
  const totalCalculator = () => {
    const productArray = form.getFieldValue("purchaseInvoiceProduct");

    const subTotal =
      productArray?.reduce((subTotal, current) => {
        const quantity = current?.productQuantity || 0;
        const price = current?.productPurchasePrice || 0;
        const vat = current?.tax || 0;
        const subPrice = price * quantity;
        const totalVat = (vat / 100) * subPrice;
        return [...subTotal, { subPrice, totalVat }];
      }, []) || [];

    setSubTotal(subTotal);

    const total = subTotal?.reduce((acc, item) => acc + item.subPrice, 0);
    const totalTaxAmount = subTotal?.reduce(
      (acc, item) => acc + item.totalVat,
      0
    );
    const totalPayable = total + totalTaxAmount;
    const paidAmountArray = form.getFieldValue("paidAmount") || [];
    const paidAmount = paidAmountArray?.reduce((acc, item) => {
      return acc + (item.amount ? parseInt(item.amount) : 0);
    }, 0);
    const due = totalPayable - paidAmount;
    setDue(due);
  };

  // New function to handle supplier selection change
  const handleSetSupplier = (value) => {
    const findSupplier = allSuppliers.find((sup) => sup.name === value);
    if (findSupplier) {
      setSelectedSupplier(findSupplier.name);
      setSelectedSupplierId(findSupplier.id);
      form.setFieldsValue({
        suppliername: findSupplier.name,
        supplierId: findSupplier.id,
      });
    }
  };

  useEffect(() => {
    if (selectedSupplierId) {
      form.setFieldsValue({
        supplierId: selectedSupplierId,
      });
    }
  }, [selectedSupplierId, form]);

  const supplier = allSuppliers?.find((item) => item.name === selectedSupplier);
  const isSupplierValid = !form.getFieldValue("supplierName") || !!supplier;

  const total = subTotal?.reduce((acc, item) => acc + item.subPrice, 0);
  const totalTaxAmount = subTotal?.reduce(
    (acc, item) => acc + item.totalVat,
    0
  );
  const totalPayable = total + totalTaxAmount;

  return (
    <Form
      form={form}
      className="w-full "
      name="dynamic_form_nest_item"
      onFinish={onFormSubmit}
      onFinishFailed={() => {
        setLoader(false);
      }}
      layout="vertical"
      size="large"
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      autoComplete="off"
      initialValues={{
        paidAmount: [],
        date: dayjs(),
        purchaseInvoiceProduct: [{}],
      }}
    >
      <div className="flex gap-4 2xl:h-[calc(100vh-100px)] min-h-[500px]">
        <div className="w-[70%] 2xl:w-[75%]">
          <Products
            totalCalculator={totalCalculator}
            subTotal={subTotal}
            form={form}
            productList={productList}
            productLoading={productLoading}
            setSelectedSupplier={setSelectedSupplier}
            setSelectedSupplierAddress={setSelectedSupplierAddress}
            setSelectedSupplierPhone={setSelectedSupplierPhone}
          />
        </div>
        <div className="flex flex-col w-[30%] 2xl:w-[25%]">
          <div className="flex-grow">
            <div className="w-full">
              <Form.Item
                label="Supplier"
                name="supplierName"
                className="w-full mb-0"
                rules={[
                  {
                    required: true,
                    message: "Please Select a supplier!",
                  },
                ]}
                validateStatus={!isSupplierValid ? "error" : "success"}
                help={!isSupplierValid ? "Supplier Not Found" : null}
              >
                <SelectAntd
                  className="w-full"
                  placeholder="Select Supplier"
                  options={allSuppliers?.map((sup) => ({
                    label: sup.name,
                    value: sup.name,
                  }))}
                  addNew={{
                    title: "Add New Supplier",
                    component: (
                      <AddSup
                        data={{
                          name: selectedSupplier,
                          address: selectedSupplierAddress,
                          phone: selectedSupplierPhone,
                        }}
                      />
                    ),
                    className: "md:w-[60%]",
                    zIndex: 1050,
                  }}
                  onChange={(value) => {
                    handleSetSupplier(value);
                  }}
                  ismatch={isSupplierValid}
                />
              </Form.Item>

              <Form.Item name="supplierId" hidden>
                <Input />
              </Form.Item>

              {supplier && (
                <div className="flex justify-between py-1 px-4">
                  <span>
                    <span>Address: </span>
                    <span>{supplier?.address}</span>{" "}
                  </span>
                  <span>
                    <span>Phone: </span>
                    <span>{supplier?.phone}</span>{" "}
                  </span>
                </div>
              )}
            </div>

            <Form.Item
              name="date"
              label="Date"
              className="w-full mb-0"
              layout="horizental"
              required
              rules={[
                {
                  required: true,
                  message: "Please input Date!",
                },
              ]}
            >
              <DatePicker
                size="small"
                format={"YYYY-MM-DD"}
                className="date-picker"
              />
            </Form.Item>

            <Form.Item
              className="w-full mb-0"
              name="supplierMemoNo"
              label="Supplier Memo"
            >
              <Input className="w-full" placeholder="Memo no " />
            </Form.Item>

            <Form.Item className="w-full mb-0" name="note" label="Note">
              <Input className="w-full" placeholder="Note" />
            </Form.Item>
          </div>
          <div className="py-2">
            <div className=" flex justify-between">
              <strong>Total amount: </strong>
              <strong>{total.toFixed(2)}</strong>
            </div>

            <div className="py-1 flex justify-between items-center">
              <span>Total tax amount: </span>
              <span>{totalTaxAmount.toFixed(2)}</span>
            </div>
            <div className="py-1 flex justify-between items-center">
              <strong>Total Payable: </strong>
              <strong>{totalPayable.toFixed(2)}</strong>
            </div>

            <div className="py-1 mb-4 flex justify-between">
              <strong>Due Amount:</strong>
              <strong>{due.toFixed(2)}</strong>
            </div>
            <div className="flex justify-between mb-2">
              <span className="">Paid Amount: </span>
              <div className="w-[65%] flex items-center justify-between gap-2">
                <Payments totalCalculator={totalCalculator} />
              </div>
            </div>
            <Form.Item style={{ marginTop: "15px" }}>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={loader}
                onClick={() => setLoader(true)}
              >
                Create Purchase
              </Button>
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  );
};
export default AddPurchase;
