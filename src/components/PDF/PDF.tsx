import {
  Document,
  Font,
  Page as PagePrimitive,
  Text,
  View,
} from "@react-pdf/renderer";
import { ReactNode } from "react";
import createTw from "react-pdf-tailwind";
import InterBlack from "../../fonts/Inter-Black.ttf";
import InterBold from "../../fonts/Inter-Bold.ttf";
import InterLight from "../../fonts/Inter-Light.ttf";
import InterMedium from "../../fonts/Inter-Medium.ttf";
import InterRegular from "../../fonts/Inter-Regular.ttf";
import InterSemiBold from "../../fonts/Inter-SemiBold.ttf";
import InterThin from "../../fonts/Inter-Thin.ttf";

interface PagePDFProps {
  children: ReactNode;
}

Font.register({
  family: "Inter",
  fontStyle: "normal",
  fontWeight: "normal",
  fonts: [
    {
      src: InterThin,
      fontWeight: "thin",
    },
    {
      src: InterLight,
      fontWeight: "light",
    },
    {
      src: InterRegular,
      fontWeight: "regular",
    },
    {
      src: InterMedium,
      fontWeight: "medium",
    },
    {
      src: InterSemiBold,
      fontWeight: "semibold",
    },
    {
      src: InterBold,
      fontWeight: "bold",
    },
    {
      src: InterBlack,
      fontWeight: "black",
    },
  ],
});

export const tw = createTw({
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
});

const PagePDF = ({ children }: PagePDFProps) => {
  return (
    <>
      <Document>{children}</Document>
    </>
  );
};

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <>
      <PagePrimitive size="A4" style={tw("font-sans")}>
        {children}
        <Footer />
      </PagePrimitive>
    </>
  );
};

const Footer = () => {
  return (
    <>
      <View style={tw("absolute bottom-0 h-[20mm] w-full text-center")} fixed>
        <View style={tw("my-auto")}>
          <Text style={tw("uppercase text-sm font-bold")}>
            Mais informações em: bolaodaquina.com.br
          </Text>
          <Text style={tw("text-xs font-bold mt-2")}>
            <>
              {new Intl.DateTimeFormat("pt").format()}
              {" - "}
              {new Date()
                .getHours()
                .toLocaleString("pt-br", { minimumIntegerDigits: 2 }) +
                "h:" +
                new Date()
                  .getMinutes()
                  .toLocaleString("pt-br", { minimumIntegerDigits: 2 })}
            </>
          </Text>
        </View>
      </View>
    </>
  );
};

export const PDF = {
  Root: PagePDF,
  Page: Page,
};
