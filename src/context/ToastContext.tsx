import { useState, createContext, useContext, useRef } from "react";
import './Toast.css'

const TOAST_TIMEOUT = 3000;
const SUCCESS_COLOR = "#32a852";
const WARNING_COLOR = "#bdac19";
const ERROR_COLOR = "#a83232";
const INFO_COLOR = "#392bb5";

interface ToastContextType {
  success: (newText: string) => void,
  warning: (newText: string) => void,
  error: (newText: string) => void,
  info: (newText: string) => void,
}
export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode}) => {
	const [showing, setShowing] = useState<boolean>(false);
	const [text, setText] = useState<string>("");
	const [color, setColor] = useState<string>("#75ffd1");

	const timeoutIdRef = useRef<number | null>(null);

	function success(newText: string) {
		showToast(newText, SUCCESS_COLOR);
	}

	function warning(newText: string) {
		showToast(newText, WARNING_COLOR);
	}

	function error(newText: string) {
		showToast(newText, ERROR_COLOR);
	}

	function info(newText: string) {
		showToast(newText, INFO_COLOR);
	}

	function showToast(withText: string, withColor: string) {
		if (timeoutIdRef.current !== null) {
			clearTimeout(timeoutIdRef.current);
			timeoutIdRef.current = null;
		}

		const id = setTimeout(() => {
			setShowing(false);
			timeoutIdRef.current = null;
		}, TOAST_TIMEOUT);
		timeoutIdRef.current = id;

		setColor(withColor);
		setText(withText);
		setShowing(true);
	}

	return (
		<ToastContext.Provider
			value={{
				success,
				warning,
				error,
				info,
			}}
		>
			{showing && (
				<div className="toast" style={{backgroundColor: color}}>
          {text}
        </div>
			)}
			{children}
		</ToastContext.Provider>
	);
}

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}