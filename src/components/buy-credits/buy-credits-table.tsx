import CreditsIcon from "@/assets/svg/credits.svg?react";
import ArrowRight from "@/assets/svg/arrow-right.svg?react";
import { useState } from "react";
import { pricing } from "./credits";
import { Button } from "../ui/button";
import clsx from "clsx";
import { Input } from "../ui/input";
import { calculatePrice } from "./credits";
import TanstackTableCheckbox from "../ui/tanstack-table-checkbox";
import { TypographyMuted, TypographyP } from "../ui/typography";
import { TableOverflowWrapper } from "../templates/tables-overflow-wrapper";

type Props = {
  onSubmit: (quantity: number) => void;
};

function BuyCreditsTable({ onSubmit }: Props) {
  const [customCredits, setCustomCredits] = useState("");
  const [customPrice, setCustomPrice] = useState("--");
  const [customTotal, setCustomTotal] = useState("--");

  const [selectedRowId, setSelectedRowId] = useState("");
  const [resultedTotal, setResultedTotal] = useState(0);
  const [resultedCredits, setResultedCredits] = useState(0);

  const handleCustomCreditsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCustomCredits(value);
    const numberValue = Number(value);

    if (value && !isNaN(numberValue)) {
      const pricePerCredit = calculatePrice(numberValue);

      const totalPrice = (numberValue * pricePerCredit).toFixed(2);
      setCustomPrice(pricePerCredit.toFixed(2));
      setCustomTotal(totalPrice);

      setResultedTotal(Number(totalPrice));
      setResultedCredits(Number(value));
    } else {
      setCustomPrice("--");
      setCustomTotal("--");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col flex-1">
        <TableOverflowWrapper>
          <div className="h-9 w-full grid grid-cols-3 py-2 px-4 ">
            <TypographyMuted className="text-text_03">Credits</TypographyMuted>
            <TypographyMuted className="text-text_03">Price per Credit</TypographyMuted>
            <TypographyMuted className="text-text_03">Total Price</TypographyMuted>
          </div>

          {pricing.map((option) => (
            <div
              key={option.id}
              className={clsx(
                `h-16 cursor-pointer px-4 w-full
              grid grid-cols-3 border-b border-input items-center`,
                selectedRowId === option.id && "dark:bg-container_same_bg"
              )}
            >
              <div className="flex space-x-2 items-center">
                <TanstackTableCheckbox
                  variant="circle"
                  {...{
                    checked: selectedRowId === option.id,
                    onChange: () => {
                      setSelectedRowId(option.id);
                      setResultedTotal(option.total);
                      setResultedCredits(option.credits);
                    },
                  }}
                />

                <CreditsIcon />
                <TypographyMuted>{option.credits}</TypographyMuted>
              </div>

              <TypographyMuted
                className={clsx(selectedRowId === option.id && "dark:text-foreground")}
              >
                ${option.pricePerCredit.toFixed(2)}
              </TypographyMuted>
              <TypographyMuted
                className={clsx(selectedRowId === option.id && "dark:text-foreground")}
              >
                ${option.total.toFixed(2)}
              </TypographyMuted>
            </div>
          ))}
        </TableOverflowWrapper>

        <div
          className={clsx(
            `h-16 py-2 px-8 cursor-pointer grid grid-cols-3 w-full 
            border-b border-input items-center`
          )}
        >
          <div className="flex space-x-2 items-center">
            <TanstackTableCheckbox
              variant="circle"
              {...{
                checked: selectedRowId === "custom",
                onChange: () => {
                  setSelectedRowId("custom");
                  setResultedTotal(Number(customTotal));
                  setResultedCredits(Number(customCredits));
                },
              }}
            />
            <CreditsIcon />

            <Input
              className="pl-0 border-none active:border-none focus-visible:ring-0 bg-transparent w-36"
              value={customCredits}
              onChange={handleCustomCreditsChange}
              onFocus={() => setSelectedRowId("custom")}
              placeholder="Enter amount"
            />
          </div>
          <TypographyMuted>{customPrice}</TypographyMuted>
          <TypographyMuted>{customTotal}</TypographyMuted>
        </div>
      </div>

      {!!resultedTotal && (
        <div
          className="h-[84px] px-8 py-5 flex justify-between mb-4
          items-center border rounded-lg border-input"
        >
          <div className="flex flex-col space-y-2">
            <TypographyMuted className="text-text_02">Summary:</TypographyMuted>

            <div className="flex items-center space-x-2">
              <CreditsIcon />
              <TypographyP>{resultedCredits.toFixed(2)}</TypographyP>
              <TypographyMuted className="text-text_01">
                / ${resultedTotal.toFixed(2)}
              </TypographyMuted>
            </div>
          </div>

          <div className="flex items-center">
            <Button className="group" onClick={() => onSubmit(resultedTotal)}>
              Continue
              <ArrowRight className="group-hover:scale-150 transition-all" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyCreditsTable;
