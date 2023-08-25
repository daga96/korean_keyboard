import React, { useState } from "react";
import { layouts } from "./layouts";
import * as Hangul from "hangul-js";
import { Button, Flex } from "@chakra-ui/react";

const Keyboard = () => {
  const layout = layouts;
  const [value, setValue] = useState("");
  const [capsLock, setCapLock] = useState(false);
  const [currentLayout, setCurrentLayout] = useState(layout.keyLayout);
  const flexContainers = [];
  let currentFlex = [];

  const toggleCapsLock = () => {
    capsLock
      ? setCurrentLayout(layout.keyLayout)
      : setCurrentLayout(layout.keyLayoutShift);
    setCapLock(!capsLock);
  };

  const handleKeyPress = (key) => {
    let newValue = value;

    switch (key) {
      case "backspace":
        newValue = value.substring(0, value.length - 1);
        break;

      case "caps":
        toggleCapsLock();
        return;

      case "enter":
        newValue += "\n";
        break;

      case "space":
        newValue += " ";
        break;

      case "shift":
        toggleCapsLock();
        return;

      default:
        newValue += key;
        newValue = Hangul.assemble(newValue);
        break;
    }
    setValue(newValue);
  };

  currentLayout.forEach((key) => {
    if (["backspace", "ㅔ", "ㅖ", "enter", "?"].includes(key)) {
      currentFlex.push(
        <Button
          variant="unstyled"
          key={key}
          width={"100px"}
          borderRadius="5px"
          border={"none"}
          height={"50px"}
          fontWeight="bold"
          fontSize={{ base: "14px", md: "16px" }}
          _hover={{ bg: "#A0A0A0" }}
          _active={{ bg: "#808080", transform: "scale(0.95)" }}
          padding={{ base: "10px 12px", md: "12px 16px" }}
          bg={"#353230"}
          color="#FFFFFF"
          onClick={() => handleKeyPress(key)}
        >
          {key}
        </Button>
      );
      if (currentFlex.length > 0) {
        flexContainers.push(currentFlex);
        currentFlex = [];
      }
    } else {
      if (key == "space") {
        currentFlex.push(
          <Button
            variant="unstyled"
            key={key}
            width={"450px"}
            height={"50px"}
            borderRadius="5px"
            border={"none"}
            fontWeight="bold"
            fontSize={{ base: "14px", md: "16px" }}
            _hover={{ bg: "#A0A0A0" }}
            _active={{ bg: "#808080", transform: "scale(0.95)" }}
            padding={{ base: "10px 12px", md: "12px 16px" }}
            bg={"#353230"}
            color="#FFFFFF"
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </Button>
        );
      } else {
        currentFlex.push(
          <Button
            variant="unstyled"
            key={key}
            width={"60px"}
            height={"50px"}
            borderRadius="5px"
            border={"none"}
            fontWeight="bold"
            fontSize={{ base: "14px", md: "16px" }}
            _hover={{ bg: "#A0A0A0" }}
            _active={{ bg: "#808080", transform: "scale(0.95)" }}
            padding={{ base: "10px 12px", md: "12px 16px" }}
            bg={"#353230"}
            color="#FFFFFF"
            onClick={() => handleKeyPress(key)}
          >
            {key}
          </Button>
        );
      }
    }
  });

  if (currentFlex.length > 0) {
    flexContainers.push(currentFlex);
  }

  return (
    <Flex
      bg={"#111111"}
      flexDir={"column"}
      position="fixed"
      bottom={0}
      left={0}
      width={"100%"}
      padding={5}
      alignItems="center"
      gap={"5px"}
      zIndex={20}
    >
      {flexContainers.map((el, idx) => (
        <Flex key={idx} gap={"5px"}>
          {el}
        </Flex>
      ))}
    </Flex>
  );
};

export default Keyboard;
