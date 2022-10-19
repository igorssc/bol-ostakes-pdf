import { Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { PDFContext } from "../../contexts/PDFContexts";
import { formatDate } from "../../utils/format";
import { Ball } from "./Ball";
import { tw } from "./PDF";

export const LastResult = () => {
  const { lastResult } = useContext(PDFContext);

  return (
    <>
      <View style={tw("flex flex-col items-center justify-center my-[6mm]")}>
        <View style={tw("flex flex-row mt-6 text-xs")}>
          <Text style={tw("")}>Último resultado - </Text>
          <Text style={tw("font-bold")}>{formatDate(lastResult.date)}</Text>
        </View>
        <View
          style={tw("bg-[#D6E3FF] px-8 py-4 rounded-full flex flex-row mt-5")}
        >
          {lastResult.dozens
            .sort((a, b) => a - b)
            .map((dozen) => (
              <Ball checked number={dozen} key={dozen} style="mx-2" />
            ))}
        </View>
      </View>
    </>
  );
};
