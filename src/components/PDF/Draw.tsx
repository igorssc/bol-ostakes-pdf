import { Image, View } from "@react-pdf/renderer";
import data from "../../../data.json";
import mensIcon from "../../assets/mens.png";
import { Ball } from "./Ball";
import { tw } from "./PDF";

export const Draw = () => {
  return (
    <>
      <View style={tw("relative")}>
        <View
          style={tw("flex flex-col gap-5 items-center justify-center mt-6")}
        >
          {Array.from({ length: 8 }, (_, indexRow) => (
            <View style={tw("flex flex-row gap-2")} key={indexRow}>
              {Array.from({ length: 10 }, (_, indexColumn) => (
                <Ball
                  number={indexRow * 10 + 1 + indexColumn}
                  style="mx-1 my-1"
                  key={indexColumn}
                  checked={data.results.some((result) =>
                    result.dozens.some(
                      (dozen) => dozen === indexRow * 10 + 1 + indexColumn
                    )
                  )}
                />
              ))}
            </View>
          ))}
        </View>

        <View style={tw("absolute -bottom-16 w-full h-72 flex items-center")}>
          <Image style={tw("w-[198mm] h-[79.2mm] m-auto")} src={mensIcon} />
        </View>
      </View>
    </>
  );
};
