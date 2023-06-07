"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import FirstBanner from "./banners/FirstBanner";
import SecondBanner from "./banners/SecondBanner";
import ThirdBanner from "./banners/ThirdBanner";
import styles from "./page.module.scss";
import { throttle } from "lodash";

export default function HomePage() {
  const currentIndex = useRef<number>(0);
  const [elemY, setElemY] = useState<number[]>([]);

  const handleScroll = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      const { current } = currentIndex;
      if (e.deltaY > 0 && current < elemY.length - 1) {
        //scroll down
        console.log("down");
        currentIndex.current += 1;
        window.scrollTo(0, elemY[currentIndex.current]);
      } else if (e.deltaY < 0 && current > 0) {
        //scroll up
        console.log("up");
        currentIndex.current -= 1;
        window.scrollTo(0, elemY[currentIndex.current]);
      }
    },
    [elemY]
  );

  useEffect(() => {
    if (elemY.length !== 0) {
      window.addEventListener(
        "wheel",
        throttle(handleScroll, 250, { leading: true, trailing: false }),
        { passive: false }
      );

      return () => {
        window.removeEventListener("wheel", handleScroll);
      };
    }
  }, [elemY, handleScroll]);

  const elementMounted = useCallback((e: HTMLDivElement) => {
    // 마운트시 가장 위로 스크롤
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
    const array = Array.from(e.children);
    const result: number[] = [];
    // 랜딩 되었을 때 스크롤이 내려가 있을 경우 저장되는 값을 초기화
    // ex) 중간 스크롤에서 새로고침
    let temp = 0;
    array.forEach((elem, idx) => {
      const yAxis = elem.getBoundingClientRect().top;
      if (idx === 0 && yAxis < 0) temp += Math.abs(yAxis);
      result.push(elem.getBoundingClientRect().top + temp);
    });
    setElemY(result);
  }, []);

  return (
    <div className={styles.wrapper} ref={elementMounted}>
      <FirstBanner />
      <SecondBanner />
      <ThirdBanner />
    </div>
  );
}
