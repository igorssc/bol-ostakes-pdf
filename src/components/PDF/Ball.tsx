import { Text, View } from "@react-pdf/renderer";
import clsx from "clsx";
import { tw } from "./PDF";

interface BallProps {
  number: number;
  style?: string;
  checked?: boolean | { style: string };
}

export const Ball = ({ number, style, checked = false }: BallProps) => (
  <>
    <View
      style={tw(
        clsx(
          "w-[12mm] h-[12mm] text-sm font-black rounded-full bg-gray-300 text-center",
          style,
          checked && "bg-[#286CFF] text-white",
          typeof checked === "object" && checked.style
        )
      )}
    >
      <Text style={tw("my-auto")}>{number}</Text>
    </View>
  </>
);
