import create from 'zustand';

interface IStore {
  /** 방입장여부 */
  isEntered: boolean;
  onChangeIsEntered: (v: boolean) => void;
}
export const useAppStore = create<IStore>(set => {

  return {
    isEntered: false,
    onChangeIsEntered: (v: boolean) => {
      set({ isEntered: v });
    }
  };
})
