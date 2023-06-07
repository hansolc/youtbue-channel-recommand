"use client";

import TypingAnimation from "@/components/TypingAnimation";
import "./Banner.module.scss";

export default function FirstBanner() {
  return (
    <section>
      <TypingAnimation
        text={[
          "안녕하세요, ChatGPT을 통해 YouTube 채널을 추천해드려요!",
          "채널을 추천 드리기 위해 몇가지 질문을 준비했어요!",
        ]}
      />
    </section>
    // <section>section 1</section>
  );
}
