import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

export interface UseWindowState{
  width: number;
  height: number;
  orientation: 'horizontal' | 'vertical';
}

export interface WindowChangeLayout{
  window: ScaledSize;
  screen: ScaledSize;
}

const { width, height } = Dimensions.get('window');

export default function useWindow(): UseWindowState {

    const [ windowWidth, setWindowWidth ] = useState(width);
    const [ windowHeight, setWindowHeight ] = useState(height);

    useEffect(() => {
      const subscription = Dimensions.addEventListener(
        'change', 
        ({ window }: WindowChangeLayout) => {
          window.width === windowWidth || setWindowWidth(window.width);
          window.height === windowHeight || setWindowHeight(window.height);
        }
      );

      return () => {
        subscription.remove();
      }
    });

    return {
      width: windowWidth,
      height: windowHeight,
      orientation: width > height ? 'horizontal' : 'vertical'
    }
};