import { IoCloseSharp } from "react-icons/io5";
import { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa6";
import { Connect } from "../Shopify/Connect";
import { Configure } from "../Shopify/Configure";
import { Sync } from "../Shopify/Sync";
import { Review } from "../Shopify/Review";
import { BaseModal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { createSource, updateSource } from "../../api/shopify";


const steps = [
  { label: "Connect", sub: "Authentication" },
  { label: "Configure", sub: "Store Details" },
  { label: "Sync Schedule", sub: "Manual or Automated" },
  { label: "Review Configuration", sub: "" },
];

export const ShopifyModal = ({
  onClose,
  isEditMode,
  formData,
  setFormData,
}) => {
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

const handleSubmit = async () => {
  try {
    let data;

    if (isEditMode) {
      data = await updateSource(formData._id, formData);
    } else {
      data = await createSource(formData);
    }

    console.log(data);
    setStep(5);
  } catch (err) {
    console.error(err);
  }
};
return (
  <BaseModal isOpen={true} onClose={onClose} maxWidth="max-w-[900px]">
    <div
      className="bg-white rounded-lg flex flex-col
      w-[95%] max-w-[900px] h-[95vh]
      md:w-[900px] md:h-[500px]"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center px-6 py-3 border-b bg-gray-100 rounded-t-lg shrink-0">
        <div className="flex items-center gap-2">
          <img src="/shopify.png" alt="shopify" className="w-10 h-10" />
          <h2 className="text-xl font-bold">Set up Shopify</h2>
        </div>
        <Button
            onClick={onClose}
            className="p-2 bg-red-700 text-white rounded hover:bg-red-800"
          >
            <IoCloseSharp />
          </Button>
      </div>

      {/* STEP INDICATOR */}
      <div className="flex md:hidden items-center justify-center gap-2 bg-gray-100 border-b px-4 py-2 shrink-0">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                step >= i + 1
                  ? "bg-fuchsia-950 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-5 h-px bg-gray-300" />
            )}
          </div>
        ))}
        <span className="text-xs text-gray-500 ml-2">
          {steps[step - 1]?.label}
        </span>
      </div>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT STEPPER */}
        <div className="hidden md:flex w-1/4 border-r p-4 bg-gray-100 flex-col">
          {steps.map((s, i) => (
            <div
              key={i}
              className={`flex gap-3 ${i !== 0 ? "mt-4" : ""} ${
                step < i + 1 ? "opacity-50" : ""
              }`}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= i + 1
                      ? "bg-fuchsia-950 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="bg-gray-300 w-px h-12" />
                )}
              </div>
              <div>
                <p
                  className={`font-semibold ${
                    step === i + 1 ? "text-black" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </p>
                {s.sub && (
                  <p className="text-sm text-gray-400">{s.sub}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-4 ml-2 mr-2 overflow-y-auto min-w-0 ">
          {step === 1 && (
            <Connect
              formData={formData}
              setFormData={setFormData}
              error={error}
              setError={setError}
              touched={touched}
              setTouched={setTouched}
            />
          )}

          {step === 2 && (
            <Configure formData={formData} setFormData={setFormData} />
          )}

          {step === 3 && (
            <Sync formData={formData} setFormData={setFormData} />
          )}

          {step === 4 && <Review formData={formData} />}

          {step === 5 && (
            <div className="flex flex-col items-center justify-center w-full h-full">
              <div className="text-green-600 mb-4">
                <FaCheck size={50} />
              </div>
              <h2 className="text-xl font-semibold">
                {isEditMode
                  ? "Source Updated Successfully!"
                  : "Source Created Successfully!"}
              </h2>
              <p className="text-gray-500 mt-1">
                {formData.sourceName}
              </p>
            </div>
          )}
        </div>
      </div>

  {/* FOOTER */}
<div className="flex border-t justify-end px-4 py-3 bg-gray-100 rounded-b-lg shrink-0">
  <div className="flex gap-3">
    {step === 1 && (
      <>
        <Button
          text="Cancel"
          className="bg-gray-200 border rounded-md font-semibold w-32 py-2"
          onClick={onClose}
        />
        <Button
          className="bg-black text-white border rounded-md font-semibold w-32 py-2"
          text="Next"
          onClick={() => {
            setTouched(true);
            if (!formData.method) {
              setError("Select authentication method");
              return;
            }
            if (
              !isEditMode &&
              formData.method === "token" &&
              !formData.token?.trim()
            ) {
              setError("Access Token required");
              return;
            }
            setStep(2);
          }}
        />
      </>
    )}

    {step === 2 && (
      <>
        <Button
          className="bg-gray-200 border rounded-md font-semibold w-32 py-2"
          text="Back"
          onClick={() => setStep(1)}
        />
        <Button
          className="bg-black text-white border rounded-md font-semibold w-32 py-2"
          text="Next"
          onClick={() => setStep(3)}
        />
      </>
    )}

    {step === 3 && (
      <>
        <Button
          className="bg-gray-200 border rounded-md font-semibold w-32 py-2"
          text="Back"
          onClick={() => setStep(2)}
        />
        <Button
          className="bg-black text-white border rounded-md font-semibold w-32 py-2"
          text="Next"
          onClick={() => setStep(4)}
        />
      </>
    )}

    {step === 4 && (
      <>
        <Button
          className="bg-gray-200 border rounded-md font-semibold w-32 py-2"
          text="Back"
          onClick={() => setStep(3)}
        />
        <Button
          className="bg-black text-white border rounded-md font-semibold w-32 py-2"
          text={isEditMode ? "Update Source" : "Create Source"}
          onClick={handleSubmit}
        />
      </>
    )}

    {step === 5 && (
      <Button
        className="bg-black text-white border rounded-md font-semibold w-32 py-2"
        text="Done"
        onClick={onClose}
      />
    )}
  </div>
</div>
    </div>
  </BaseModal>
);
};


