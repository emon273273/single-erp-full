import Button from "@/UI/Button";
import { PlusOutlined } from "@ant-design/icons";
import { Form, InputNumber } from "antd";
import dayjs from "dayjs";
import { CiCircleRemove } from "react-icons/ci";
import Card from "../../UI/Card";
import AddProduct from "../product/AddProduct";
import InvoiceUpload from "./InvoiceUpload";
import SearchForm from "./SearchForm";
import SelectAntd from "./SelectAntd";
import CustomInvoiceDownload from "./CustomInvoiceDownload";

export default function ProductAdd({
  form,
  productList,
  totalCalculator,
  subTotal,
  setSelectedSupplier,
  setSelectedSupplierAddress,
  setSelectedSupplierPhone,
}) {
  const handleDataExtracted = (data) => {
    if (!data) return;

    console.log(data);

    setSelectedSupplier(data.supplierName);
    setSelectedSupplierAddress(data.supplierAddress);
    setSelectedSupplierPhone(data.supplierPhone);

    const processedProducts = data.purchaseInvoiceProduct.map(
      (invoiceProduct) => ({
        key: invoiceProduct.id || Math.random(),
        productName: invoiceProduct.productName || "",
        productQuantity: invoiceProduct.productQuantity || 0,
        productPurchasePrice: invoiceProduct.productPurchasePrice || 0,
        productSalePrice: invoiceProduct.productSalePrice || 0,
        tax: invoiceProduct.taxPercentage || 0,
        isScaneed: true,
      })
    );

    form.setFieldsValue({
      purchaseInvoiceProduct: processedProducts,
      date: data.date ? dayjs(data.date) : null,
      supplierId: data.supplierId || "",
      note: data.note || "",
      supplierMemoNo: data.supplierMemoNo || "",
      supplierName: data.supplierName || "",
    });

    totalCalculator();
  };

  const handleSetInitial = (product, serial) => {
    const productArray = form.getFieldValue("purchaseInvoiceProduct");
    const findProduct = productList.find((pro) => pro.name === product);
    const newArray = productArray.map((item, index) => {
      if (index === serial) {
        return {
          ...item,
          productId: product,
          productName: findProduct?.name || "",
          productQuantity: findProduct?.productQuantity ? 1 : 0,
          productSalePrice: findProduct?.productSalePrice || 0,
          productPurchasePrice: findProduct?.productPurchasePrice || 0,
          tax: 0,
          supplierName: findProduct?.supplierName || "",
        };
      } else {
        return item;
      }
    });

    form.setFieldsValue({
      purchaseInvoiceProduct: newArray,
    });
    totalCalculator(serial);
  };

  const render = (index) => {
    const formValues = form.getFieldValue("purchaseInvoiceProduct");
    const currentProduct = formValues?.[index];

    const productId = currentProduct?.productId;
    const findName = currentProduct?.productName;
    const findProduct = productList?.find((item) => findName === item.name);
    let isProductNameValid = true;
    const { isScaneed } = currentProduct || {};

    if (!findProduct && isScaneed) {
      isProductNameValid = false;
    }

    let colors = null;
    if (
      Array.isArray(findProduct?.productColor) &&
      findProduct.productColor.length > 0
    ) {
      colors = (
        <div className="flex flex-wrap gap-1">
          <span className="mr-1">Color: </span>
          {findProduct.productColor.map((item, index) => (
            <span key={item.id}>
              {item.color?.name}
              {index !== findProduct.productColor.length - 1 && ","}
            </span>
          ))}
        </div>
      );
    }

    let stock = null;
    if (findProduct?.productQuantity) {
      stock = (
        <span>
          <span className="mr-1">Stock: </span>
          <span>{findProduct.productQuantity}</span>
        </span>
      );
    }

    return {
      stock,
      colors,
      findName,
      findProduct,
      isProductNameValid,
      productId,
    };
  };

  return (
    <Card
      className="h-[calc(100vh-100px)]"
      headClass=""
      bodyClass="p-0"
      extra={<><InvoiceUpload onExtract={handleDataExtracted} /><CustomInvoiceDownload></CustomInvoiceDownload></>}
      title={<SearchForm form={form} totalCalculator={totalCalculator} />}
    >
      <>
      
      <div>
      <Form.List
        name="purchaseInvoiceProduct"
        rules={[
          {
            required: true,
            message: "Product is required",
          },
        ]}
      >
        {(fields, { add, remove }) => (
          <>
            <div className="max-h-[calc(100vh-220px)] overflow-auto">
              <table className="w-full">
                <thead className="font-Popins text-black bg-tableHeaderBg border-gray-200 sticky top-0 z-10">
                  <tr>
                    <th className="py-2 pl-2 text-left">SL</th>
                    <th className="py-2 pl-2 text-left">Product</th>
                    <th className="py-2 pl-2 text-left">Quantity</th>
                    <th className="py-2 pl-2 text-left">Purchase price</th>
                    <th className="py-2 pl-2 text-left">Selling price</th>
                    <th className="py-2 pl-2 text-left">Amount</th>
                    <th className="py-2 pl-2 text-left">Tax%</th>
                    <th className="py-2 pl-2 text-left">Tax</th>
                    <th className="py-2 pl-2 text-left"></th>
                  </tr>
                </thead>
                <tbody className="bg-tableBg">
                  {fields.map(({ key, name, ...restField }, index) => {
                    const { stock, colors, isProductNameValid, findName } =
                      render(index);
                    return (
                      <tr
                        key={key}
                        className={`hover:bg-slate-900/10 py-1 ${
                          index === fields.length - 1 ? "" : "border-b"
                        }`}
                      >
                        <td className="py-2 pl-2 align-top">{index + 1}</td>
                        <td className="py-2 pl-2 align-top">
                          <Form.Item
                            {...restField}
                            className="mb-0 max-w-[250px]"
                            name={[name, "productName"]}
                            rules={[
                              {
                                required: true,
                                message: "Product is required",
                              },
                            ]}
                            validateStatus={
                              !isProductNameValid ? "error" : "success"
                            }
                            help={!isProductNameValid ? "Not Found" : null}
                          >
                            <SelectAntd
                              className="w-full"
                              placeholder="Select Prodcut"
                              options={productList?.map((type) => ({
                                label: type.name,
                                value: type.name,
                              }))}
                              addNew={{
                                title: "Please Wait",
                                component: (
                                  <AddProduct
                                    isModal={true}
                                    product={findName}
                                  />
                                ),
                                className: "md:w-[60%]",
                                zIndex: 1050,
                              }}
                              onChange={(value) => {
                                handleSetInitial(value, index);
                              }}
                              ismatch={isProductNameValid}
                            />
                          </Form.Item>
                          <div className="px-2">{colors}</div>
                        </td>

                        {/* Rest of the table cells */}
                        <td className="py-2 pl-2 align-top">
                          <Form.Item
                            {...restField}
                            className="mb-0 max-w-[100px]"
                            name={[name, "productQuantity"]}
                            rules={[
                              {
                                required: true,
                                message: "Quantity is required",
                              },
                            ]}
                          >
                            <InputNumber
                              type="number"
                              size={"small"}
                              placeholder="Quantity"
                              onChange={() => totalCalculator(index)}
                            />
                          </Form.Item>
                          <div className="px-2">{stock}</div>
                        </td>
                        <td className="py-2 pl-2 align-top">
                          <Form.Item
                            {...restField}
                            className="mb-0 max-w-[150px]"
                            name={[name, "productPurchasePrice"]}
                            rules={[
                              {
                                required: true,
                                message: "Price is required",
                              },
                            ]}
                          >
                            <InputNumber
                              size="small"
                              type="number"
                              placeholder="50000"
                              onChange={() => totalCalculator(index)}
                            />
                          </Form.Item>
                        </td>
                        <td className="py-2 pl-2 align-top">
                          <Form.Item
                            {...restField}
                            className="mb-0 max-w-[150px]"
                            name={[name, "productSalePrice"]}
                            rules={[
                              {
                                required: true,
                                message: "Price is required",
                              },
                            ]}
                          >
                            <InputNumber
                              size="small"
                              type="number"
                              placeholder="50000"
                              onChange={() => totalCalculator(index)}
                            />
                          </Form.Item>
                        </td>
                        <td className="py-2 pl-2 align-top min-w-[80px]">
                          <div className="font-weight-bold totalMargin">
                            {subTotal[index]?.subPrice?.toFixed(2) || 0}
                          </div>
                        </td>
                        <td className="py-2 pl-2 align-top min-w-[80px]">
                          <Form.Item
                            {...restField}
                            name={[name, "tax"]}
                            className="mb-0 max-w-[100px]"
                            rules={[
                              {
                                required: true,
                                message: "Tax is required",
                              },
                            ]}
                          >
                            <InputNumber
                              size="small"
                              type="number"
                              style={{ width: "100%" }}
                              defaultValue={0}
                              onChange={() => totalCalculator(index)}
                            />
                          </Form.Item>
                        </td>
                        <td className="py-2 pl-2 align-top min-w-[80px]">
                          <div className="font-weight-bold md:text-base xxs:text-xs">
                            {subTotal[index]?.totalVat?.toFixed(2) || 0}
                          </div>
                        </td>
                        <td className="py-2 pl-2 align-top">
                          <Form.Item>
                            <button
                              shape="circle"
                              className="flex justify-center items-center hover:bg-black/40 rounded-md"
                              onClick={() => {
                                remove(name);
                                totalCalculator(index);
                              }}
                            >
                              <CiCircleRemove size={25} />
                            </button>
                          </Form.Item>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {fields.length === 0 && (
              <div className="text-center py-10">No product selected yet</div>
            )}
            <div className="flex items-center justify-center mt-2">
              <Button
                onClick={() => add()}
                className="flex items-center justify-center w-48"
                block
                icon={<PlusOutlined />}
              >
                Add Product
              </Button>
            </div>
          </>
        )}
      </Form.List>
      </div>
      </>
    </Card>
  );
}
