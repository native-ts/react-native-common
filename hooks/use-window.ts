import { useEffect, useState } from "react";
import { Dimensions, ScaledSize } from "react-native";

export interface UseWindowState extends ScaledSize{
  orientation: 'horizontal' | 'vertical';
}

export default function useWindow(): UseWindowState {

  const [dimension, setDimension] = useState(Dimensions.get('window'));

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change', 
      ({ window }: { window: ScaledSize }) => {
        if (
          window.fontScale !== dimension.fontScale ||
          window.height !== dimension.height ||
          window.scale !== dimension.scale ||
          window.width !== dimension.width
        ) {
          setDimension(window);
        }
      }
    );

    return () => {
      subscription.remove();
    }
  });

  return {
    ...dimension,
    orientation: dimension.width > dimension.height
      ? 'horizontal'
      : 'vertical'
  }
};