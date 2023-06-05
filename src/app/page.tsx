import Image from "next/image";
import styles from "./page.module.scss";
import TypingAnimation from "../components/TypingAnimation";

export default function Home() {
  return (
    <>
      <TypingAnimation
        text={[
          "안녕하세요, ChatGPT을 통해 YouTube 채널을 추천해드려요!",
          "채널을 추천 드리기 위해 몇가지 질문을 준비했어요!",
        ]}
      />
    </>
  );
}
