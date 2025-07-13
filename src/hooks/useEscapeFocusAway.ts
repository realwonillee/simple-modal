import useKeyPress from './useKeyPress';

export const useEscapeFocusAway = ({ callback }: { callback: () => void }) => {
  useKeyPress('Escape', callback);
};
